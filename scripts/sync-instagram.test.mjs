import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { feedUrl, normalizeFeed } from './sync-instagram.mjs';

const post = {
  id: '12345', permalink: 'https://www.instagram.com/p/EXAMPLE123/?utm_source=example',
  mediaType: 'IMAGE', caption: 'Example caption', timestamp: '2026-11-18T12:00:00Z',
  sizes: { medium: { mediaUrl: 'https://behold.pictures/account/post/medium.webp' } },
};
const feed = (posts = [post]) => ({ username: 'feetklawofficial', posts });

test('accepts a public feed URL and rejects credentials, queries and unrelated servers', () => {
  assert.equal(feedUrl('https://feeds.behold.so/exampleFeed123'), 'https://feeds.behold.so/exampleFeed123');
  for (const url of ['http://feeds.behold.so/exampleFeed123', 'https://localhost/exampleFeed123', 'https://feeds.behold.so.evil.test/exampleFeed123', 'https://user:password@feeds.behold.so/exampleFeed123', 'https://feeds.behold.so/exampleFeed123?token=private']) {
    assert.throws(() => feedUrl(url));
  }
});
test('requires the correct account, rejects unsafe media and keeps no more than six posts', () => {
  assert.throws(() => normalizeFeed({ username: 'anotheraccount', posts: [post] }));
  assert.throws(() => normalizeFeed(feed([{ ...post, sizes: {}, mediaUrl: 'http://127.0.0.1/private' }])));
  assert.throws(() => normalizeFeed(feed([{ ...post, id: '../outside' }])));
  assert.throws(() => normalizeFeed(feed([{ ...post, permalink: 'javascript:alert(1)' }])));
  const result = normalizeFeed(feed(Array.from({ length: 9 }, (_, index) => ({ ...post, id: String(index) }))));
  assert.equal(result.length, 6);
  assert.equal(result[0].permalink, 'https://www.instagram.com/p/EXAMPLE123/');
});
test('preserves captions as data and handles absent dates without inventing a date', () => {
  const result = normalizeFeed(feed([{ ...post, caption: '<b>caption</b>', timestamp: undefined }]))[0];
  assert.equal(result.caption, '<b>caption</b>');
  assert.equal(result.timestamp, null);
  assert.equal(result.video, null);
});

async function inTemporarySite(name, run) {
  const original = process.cwd();
  const folder = await mkdtemp(path.join(tmpdir(), 'feetklaw-ig-test-'));
  try {
    process.chdir(folder);
    const module = await import(`./sync-instagram.mjs?${name}`);
    await run(module.syncInstagram);
  } finally {
    process.chdir(original);
    const resolved = path.resolve(folder);
    if (path.dirname(resolved) !== path.resolve(tmpdir()) || !path.basename(resolved).startsWith('feetklaw-ig-test-')) {
      throw new Error('Unexpected test folder.');
    }
    await rm(resolved, { recursive: true, force: true });
  }
}

test('publishes a local media snapshot without exposing the source media URL', async (context) => {
  context.mock.method(globalThis, 'fetch', async (url) => url.startsWith('https://feeds.behold.so/')
    ? Response.json(feed())
    : new Response(new Uint8Array([1, 2, 3]), { headers: { 'content-type': 'image/webp' } }));
  await inTemporarySite('snapshot', async (sync) => {
    await sync('https://feeds.behold.so/exampleFeed123');
    const snapshot = JSON.parse(await readFile('public/instagram/feed.json', 'utf8'));
    assert.equal(snapshot.posts[0].image, '/instagram/12345-cover.webp');
    assert.equal(snapshot.posts[0].video, null);
    assert.equal((await readFile('public/instagram/12345-cover.webp')).length, 3);
    assert.ok(!JSON.stringify(snapshot).includes('behold.pictures'));
  });
});

test('preserves the previously published feed when the provider cannot refresh', async (context) => {
  const previous = {
    schemaVersion: 1, username: 'feetklawofficial', updatedAt: '2026-11-17T12:00:00Z',
    posts: [{ id: '12345', image: '/instagram/12345-cover.webp', video: null, permalink: post.permalink, caption: 'Previous post' }],
  };
  context.mock.method(globalThis, 'fetch', async (url) => {
    if (url.startsWith('https://feeds.behold.so/')) return new Response('', { status: 503 });
    if (url.endsWith('/feed.json')) return Response.json(previous);
    return new Response(new Uint8Array([4, 5, 6]), { headers: { 'content-type': 'image/webp' } });
  });
  await inTemporarySite('fallback', async (sync) => {
    await sync('https://feeds.behold.so/exampleFeed123');
    const snapshot = JSON.parse(await readFile('public/instagram/feed.json', 'utf8'));
    assert.equal(snapshot.updatedAt, previous.updatedAt);
    assert.equal(snapshot.posts[0].caption, 'Previous post');
  });
});
