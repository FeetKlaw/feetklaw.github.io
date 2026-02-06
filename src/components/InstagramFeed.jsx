import React from 'react';

/**
 * InstagramFeed renders an embedded Instagram gallery on the site. It uses
 * SnapWidget (https://snapwidget.com) to display the most recent posts from
 * the official Feet Klaw Instagram account.
 */
export default function InstagramFeed() {
  return (
    <div className="fk-card p-6 md:p-8" data-testid="instagram-feed">
      <div className="fk-kicker">Social</div>
      <h2 className="mt-3 text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Follow Us on Instagram
      </h2>
      <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
        Catch teasers, behind‑the‑scenes shots and more on our official Instagram.
        The feed below updates automatically with our latest posts.
      </p>
      <div className="mt-4 w-full overflow-hidden" style={{ borderRadius: '12px' }}>
        <iframe
          title="Feet Klaw Instagram"
          src="https://snapwidget.com/embed/1117594"  
          width="100%"
          height="380"
          frameBorder="0"
          scrolling="no"
          allowTransparency="true"
        ></iframe>
      </div>
      <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
        You can still see our latest updates by visiting our profile
        <a href="https://instagram.com/feetklawofficial" target="_blank" rel="noopener noreferrer">
          on Instagram
        </a>.
      </div>
    </div>
  );
}
