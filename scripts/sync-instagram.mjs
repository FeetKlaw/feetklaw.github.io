import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const USERNAME = 'feetklawofficial';
const ORIGIN = 'https://www.feetklaw.com';
const OUTPUT = path.resolve('public/instagram');
const MEDIA_TYPES = new Map([
  ['image/jpeg', 'jpg'], ['image/png', 'png'], ['image/webp', 'webp'],
  ['image/avif', 'avif'], ['video/mp4', 'mp4'], ['video/webm', 'webm'],
]);

export function feedUrl(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.hostname !== 'feeds.behold.so' || url.port ||
      url.username || url.password || url.search || url.hash || !/^\/[A-Za-z0-9_-]{8,100}\/?$/.test(url.pathname)) {
    throw new Error('Use the public JSON feed URL supplied by Behold.');
  }
  return url.href;
}

function mediaUrl(value, previous = false) {
  const url = new URL(value);
  const hostname = url.hostname;
  const allowed = previous
    ? url.origin === ORIGIN && /^\/instagram\/[A-Za-z0-9_-]+\.(jpg|png|webp|avif|mp4|webm)$/.test(url.pathname)
    : hostname === 'behold.pictures' || hostname.endsWith('.behold.pictures') ||
      hostname.endsWith('.cdninstagram.com') || hostname.endsWith('.fbcdn.net');
  if (url.protocol !== 'https:' || url.port || url.username || url.password || !allowed) {
    throw new Error('Unexpected media address.');
  }
  return url.href;
}

export function normalizeFeed(data) {
  if (data?.username?.toLowerCase() !== USERNAME || !Array.isArray(data.posts)) {
    throw new Error('The feed must belong to feetklawofficial.');
  }
  return data.posts.slice(0, 6).map((post) => {
    const id = String(post.id);
    if (!/^[A-Za-z0-9_-]{1,100}$/.test(id)) throw new Error('Invalid post identifier.');
    const permalink = new URL(post.permalink);
    if (permalink.protocol !== 'https:' || !['instagram.com', 'www.instagram.com'].includes(permalink.hostname) ||
        permalink.port || permalink.username || permalink.password || !/^\/(p|reel|tv)\/[A-Za-z0-9_-]+\/?$/.test(permalink.pathname)) {
      throw new Error('Invalid Instagram post address.');
    }
    permalink.search = ''; permalink.hash = '';
    const type = ['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'].includes(post.mediaType) ? post.mediaType : 'IMAGE';
    const image = post.sizes?.medium?.mediaUrl || post.sizes?.small?.mediaUrl || post.thumbnailUrl || (type === 'IMAGE' ? post.mediaUrl : null);
    if (!image) throw new Error('A post is missing its preview image.');
    return {
      id, permalink: permalink.href, mediaType: type,
      caption: typeof post.caption === 'string' ? post.caption.slice(0, 5000) : '',
      timestamp: Number.isNaN(Date.parse(post.timestamp)) ? null : new Date(post.timestamp).toISOString(),
      image: mediaUrl(image), video: type === 'VIDEO' && post.mediaUrl ? mediaUrl(post.mediaUrl) : null,
    };
  });
}

async function responseFor(url, validate, redirects = 0) {
  const response = await fetch(validate(url), { redirect: 'manual', signal: AbortSignal.timeout(45000) });
  if (response.status >= 300 && response.status < 400) {
    const destination = response.headers.get('location');
    if (!destination || redirects >= 3) throw new Error('Too many media redirects.');
    await response.body?.cancel();
    return responseFor(new URL(destination, url).href, validate, redirects + 1);
  }
  if (!response.ok) throw new Error(`Request returned HTTP ${response.status}.`);
  return response;
}

async function saveMedia(url, basename, video = false, previous = false) {
  const response = await responseFor(url, (value) => mediaUrl(value, previous));
  const type = response.headers.get('content-type')?.split(';')[0].trim();
  const extension = MEDIA_TYPES.get(type);
  if (!extension || !type.startsWith(video ? 'video/' : 'image/')) throw new Error('Unsupported media type.');
  const maximum = video ? 80 * 1024 * 1024 : 10 * 1024 * 1024;
  if (Number(response.headers.get('content-length')) > maximum) {
    await response.body?.cancel(); throw new Error('Media exceeds the size limit.');
  }
  const chunks = []; let length = 0;
  for await (const chunk of response.body) {
    length += chunk.length;
    if (length > maximum) { throw new Error('Media exceeds the size limit.'); }
    chunks.push(chunk);
  }
  if (!length) throw new Error('The media file is empty.');
  const filename = `${basename}.${extension}`;
  await writeFile(path.join(OUTPUT, filename), Buffer.concat(chunks));
  return `/instagram/${filename}`;
}

async function restorePrevious() {
  const response = await fetch(`${ORIGIN}/instagram/feed.json`, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('No previously published feed is available.');
  const previous = await response.json();
  if (previous?.username !== USERNAME || previous?.schemaVersion !== 1 || !Array.isArray(previous.posts) || previous.posts.length > 6) {
    throw new Error('The previously published feed is invalid.');
  }
  for (const post of previous.posts) {
    const image = mediaUrl(new URL(post.image, ORIGIN).href, true);
    post.image = await saveMedia(image, path.basename(new URL(image).pathname, path.extname(new URL(image).pathname)), false, true);
    if (post.video) {
      const video = mediaUrl(new URL(post.video, ORIGIN).href, true);
      post.video = await saveMedia(video, path.basename(new URL(video).pathname, path.extname(new URL(video).pathname)), true, true);
    }
  }
  await writeFile(path.join(OUTPUT, 'feed.json'), `${JSON.stringify(previous, null, 2)}\n`);
  console.warn('Instagram could not refresh; the previously published feed was preserved.');
}

export async function syncInstagram(value) {
  const url = feedUrl(value);
  await mkdir(OUTPUT, { recursive: true });
  try {
    const response = await responseFor(url, feedUrl);
    const posts = normalizeFeed(await response.json());
    const output = [];
    for (const post of posts) {
      const image = await saveMedia(post.image, `${post.id}-cover`);
      let video = null;
      if (post.video) {
        try { video = await saveMedia(post.video, `${post.id}-video`, true); }
        catch { console.warn(`Post ${post.id}: a video copy was unavailable; its cover remains available.`); }
      }
      output.push({ ...post, image, video });
    }
    const snapshot = { schemaVersion: 1, username: USERNAME, updatedAt: new Date().toISOString(), posts: output };
    await writeFile(path.join(OUTPUT, 'feed.json'), `${JSON.stringify(snapshot, null, 2)}\n`);
    console.log(`Instagram synchronized: ${output.length} posts.`);
  } catch (error) {
    console.warn(`Instagram refresh failed: ${error.message}`);
    await restorePrevious();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  syncInstagram(process.env.INSTAGRAM_FEED_URL).catch((error) => {
    console.error(`Instagram synchronization stopped: ${error.message}`);
    process.exitCode = 1;
  });
}
