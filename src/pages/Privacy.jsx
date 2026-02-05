import React from 'react';

export default function Privacy() {
  return (
    <main className="min-h-screen fk-bg" data-testid="privacy-page">
      <a href="#privacy-content" className="fk-skip-link" data-testid="skip-to-content-link-privacy">
        Skip to content
      </a>

      <section className="pt-14 md:pt-20 pb-16" data-testid="privacy-section">
        <div className="fk-container" id="privacy-content">
          <div className="fk-card p-7 md:p-10">
            <div className="fk-kicker" data-testid="privacy-kicker">
              Privacy
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl font-semibold" data-testid="privacy-title">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              Last updated: February&nbsp;4,&nbsp;2026
            </p>

            <h2 className="mt-5 text-xl font-semibold">1. Information We Collect</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              <strong>Usage Data:</strong> We may collect information about your interactions with our Site, such as
              the pages you visit, the content you view, and other actions on the Site. We do not implement
              third‑party analytics by default.
            </p>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              <strong>Device and Log Information:</strong> We may collect information about your device, browser
              type, IP address, and operating system for security and technical purposes.
            </p>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              <strong>Membership Data via Patreon:</strong> When you subscribe or make a payment through Patreon,
              Patreon collects your payment and personal information. We do not receive or store your credit card
              number or payment details. Patreon’s handling of your data is governed by their privacy policy.
            </p>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              <strong>Local Storage:</strong> We store a small amount of data in your browser’s local storage to
              remember your theme preference and to verify that you are over 18. This data remains on your device
              and is not transmitted to our servers.
            </p>

            <h2 className="mt-6 text-xl font-semibold">2. How We Use Information</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              We use the collected information to provide and maintain the Site and membership services, to
              communicate with you when you contact us or request support, to enhance security and functionality,
              and to comply with legal obligations and enforce our Terms of Service.
            </p>

            <h2 className="mt-6 text-xl font-semibold">3. Sharing of Information</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              We may share information with service providers who help us with website operations (e.g., hosting
              providers). We may disclose your information if required to do so by law or in response to valid
              requests by public authorities, and we may transfer information in connection with a merger,
              acquisition, or asset sale. We do <strong>not</strong> sell your personal data or share it with advertisers.
            </p>

            <h2 className="mt-6 text-xl font-semibold">4. Cookies and Tracking Technologies</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              We use minimal tracking. The only storage mechanisms we use are local storage to remember your
              theme preference and age confirmation. You may disable local storage via your browser settings, but
              some functionalities (such as remembering your theme or age confirmation) may not work.
            </p>

            <h2 className="mt-6 text-xl font-semibold">5. Data Security</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              We implement reasonable security measures to protect your information. However, no method of
              transmission over the Internet or method of electronic storage is 100% secure.
            </p>

            <h2 className="mt-6 text-xl font-semibold">6. Data Retention</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              We retain usage and device data only as long as necessary for the purposes stated in this policy or
              as required by law. Local storage data will remain until you clear your browser storage or change
              preferences.
            </p>

            <h2 className="mt-6 text-xl font-semibold">7. Your Rights</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              Depending on your jurisdiction, you may have rights to access, update, or delete personal
              information we have about you. You can manage local storage data from within your browser. For data
              controlled by Patreon, please contact Patreon directly.
            </p>

            <h2 className="mt-6 text-xl font-semibold">8. International Transfer</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              Our services are operated from servers in our jurisdiction. If you access the Site from outside our
              jurisdiction, you consent to the transfer, storage, and processing of your information in our
              jurisdiction.
            </p>

            <h2 className="mt-6 text-xl font-semibold">9. Changes to This Privacy Policy</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              We may update this Privacy Policy from time to time. We will post the updated policy on this page
              and update the “last updated” date. We encourage you to review the policy periodically.
            </p>

            <h2 className="mt-6 text-xl font-semibold">10. Contact Us</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              If you have any questions about this Privacy Policy or our data practices, please contact us using
              the information provided on the Site.
            </p>

            <div className="mt-6 text-xs" style={{ color: 'var(--text-muted)' }} data-testid="privacy-legal">
              18+ only. All models are 18+.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
