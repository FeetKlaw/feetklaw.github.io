import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Instagram, ArrowUpRight, Play, Images } from 'lucide-react';
import Modal from '@/components/Modal';
import { LINKS } from '@/config/links';

const VideoPlayer = lazy(() => import('@/components/VideoPlayer'));
const localMedia = (value) => typeof value === 'string' && /^\/instagram\/[A-Za-z0-9_-]+\.(jpg|png|webp|avif|mp4|webm)$/.test(value);
const dateLabel = (value) => {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function InstagramFeed() {
  const [feed, setFeed] = useState(null);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => {
      if (active) { setFailed(true); controller.abort(); }
    }, 12000);
    fetch('/instagram/feed.json', { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error('Feed unavailable'); return response.json(); })
      .then((data) => {
        if (data.username !== 'feetklawofficial' || !Array.isArray(data.posts)) throw new Error('Unexpected feed');
        if (active) setFeed({ ...data, posts: data.posts.slice(0, 6).filter((post) => localMedia(post.image)) });
      })
      .catch((error) => { if (active && error.name !== 'AbortError') setFailed(true); })
      .finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, []);

  return (
    <div className="fk-card p-6 md:p-8 fk-instagram" data-testid="instagram-feed">
      <div className="fk-kicker">Social</div>
      <div className="fk-instagram-heading">
        <div>
          <h2 className="mt-3 text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>On Instagram</h2>
          <a className="fk-instagram-handle" href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
            <Instagram size={15} aria-hidden="true" /> @feetklawofficial <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        <span className="fk-instagram-wordmark" aria-hidden="true">FK</span>
      </div>
      <p className="mt-4 text-sm fk-text-secondary">Teasers, behind the scenes and recent posts. Explore the latest highlights from our official account.</p>

      {!feed && !failed && <div className="fk-instagram-grid mt-5" role="status" aria-label="Loading Instagram posts">{Array.from({ length: 6 }, (_, index) => <div key={index} className="fk-instagram-skeleton" aria-hidden="true" />)}</div>}
      {feed?.posts.length > 0 && (
        <div className="fk-instagram-grid mt-5" data-testid="instagram-posts" data-count={feed.posts.length}>
          {feed.posts.map((post, index) => (
            <button type="button" key={post.id} className="fk-instagram-post" onClick={() => setSelected(post)}
              aria-label={`Open Instagram ${post.mediaType === 'VIDEO' ? 'video' : 'post'} ${index + 1}${post.caption ? `: ${post.caption.slice(0, 100)}` : ''}`}>
              <img src={post.image} alt={post.caption?.slice(0, 180) || `Instagram post by feetklawofficial`} loading="lazy" decoding="async" />
              <span className="fk-instagram-post-shade" aria-hidden="true" />
              <span className="fk-instagram-post-icon" aria-hidden="true">{post.mediaType === 'VIDEO' ? <Play size={16} fill="currentColor" /> : post.mediaType === 'CAROUSEL_ALBUM' ? <Images size={16} /> : <Instagram size={16} />}</span>
              <span className="fk-instagram-post-date">{dateLabel(post.timestamp)}</span>
            </button>
          ))}
        </div>
      )}
      {(failed || feed?.posts.length === 0) && <div className="fk-instagram-empty mt-5" role="status"><Instagram size={28} aria-hidden="true" /><p>Our Instagram highlights are unavailable right now.</p><p className="text-xs fk-text-secondary">You can still visit our official profile below.</p></div>}
      <div className="fk-instagram-footer">
        <span className="text-xs fk-text-secondary">@feetklawofficial · 18+</span>
        <a href={LINKS.instagram} className="fk-button text-xs" target="_blank" rel="noopener noreferrer">Visit profile <ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Instagram · @feetklawofficial" dataTestId="instagram-preview">
        {selected && <div>
          {selected.video && localMedia(selected.video)
            ? <Suspense fallback={<p className="fk-text-secondary">Loading video…</p>}><VideoPlayer src={selected.video} poster={selected.image} title="Feet Klaw Instagram preview" /></Suspense>
            : <img src={selected.image} alt={selected.caption?.slice(0, 180) || 'Instagram post by feetklawofficial'} className="fk-instagram-expanded" />}
          {selected.caption && <p className="mt-4 text-sm fk-text-secondary whitespace-pre-wrap">{selected.caption}</p>}
          <div className="fk-instagram-footer"><span className="text-xs fk-text-secondary">{dateLabel(selected.timestamp)}</span><a className="fk-button text-xs" href={selected.permalink} target="_blank" rel="noopener noreferrer">View on Instagram <ArrowUpRight size={14} aria-hidden="true" /></a></div>
        </div>}
      </Modal>
    </div>
  );
}
