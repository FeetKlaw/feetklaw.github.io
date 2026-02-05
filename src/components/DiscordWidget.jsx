import React from 'react';

/**
 * DiscordWidget embeds the official Discord server widget directly into the
 * site. This component renders a card with a header and an iframe that
 * displays live information about the Feet Klaw Discord community.
 */
export default function DiscordWidget() {
  return (
    <div className="fk-card p-6 md:p-8" data-testid="discord-widget">
      <div className="fk-kicker">Community</div>
      <h2 className="mt-3 text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Join Our Discord
      </h2>
      <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
        See who’s online and connect with other members. Our Discord server is
        the place for real‑time chat, updates and support.
      </p>
      <div className="mt-4 w-full overflow-hidden" style={{ borderRadius: '12px' }}>
        <iframe
          title="Feet Klaw Discord"
          src="https://discord.com/widget?id=993035852173279242&theme=dark"
          width="100%"
          height="380"
          allowTransparency="true"
          frameBorder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </div>
    </div>
  );
}
