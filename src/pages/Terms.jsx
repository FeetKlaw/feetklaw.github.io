import React from 'react';

export default function Terms() {
  return (
    <main className="min-h-screen fk-bg" data-testid="terms-page">
      <a href="#terms-content" className="fk-skip-link" data-testid="skip-to-content-link-terms">
        Skip to content
      </a>

      <section className="pt-14 md:pt-20 pb-16" data-testid="terms-section">
        <div className="fk-container" id="terms-content">
          <div className="fk-card p-7 md:p-10">
            <div className="fk-kicker" data-testid="terms-kicker">
              Terms
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl font-semibold" data-testid="terms-title">
              Terms of Service
            </h1>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              Last updated: February&nbsp;4,&nbsp;2026
            </p>

            <h2 className="mt-5 text-xl font-semibold">1. Eligibility and Age Requirement</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              This Site contains adult‑oriented content and is intended only for users who are at least 18 years
              old or the age of majority in their jurisdiction. By using the Site, you represent and warrant that
              you meet this age requirement and that all information you provide is accurate.
            </p>

            <h2 className="mt-6 text-xl font-semibold">2. Membership Services via Patreon</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              Access to premium or membership content is provided through a third‑party platform, Patreon. When
              subscribing or making payments through Patreon, you agree to comply with Patreon’s terms and payment
              processing policies. We do not directly process payments and do not store or access your payment
              information.
            </p>

            <h2 className="mt-6 text-xl font-semibold">3. Intellectual Property</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              All content on the Site, including images, text, graphics, logos, and names, is our property or the
              property of our licensors and is protected by copyright and trademark laws. You may not reproduce,
              distribute, modify, or create derivative works from any materials on the Site without our written
              permission. Permission is granted for personal, non‑commercial viewing of content and materials.
            </p>

            <h2 className="mt-6 text-xl font-semibold">4. Prohibited Conduct</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              You agree not to use the Site for any illegal or unauthorized purpose; violate any laws or
              regulations; post or transmit any content that is abusive, defamatory, obscene (other than the
              content we provide), or otherwise objectionable; or attempt to interfere with the Site’s security
              or manipulate any network or service used to provide the Site.
            </p>

            <h2 className="mt-6 text-xl font-semibold">5. Disclaimers</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              The Site is provided on an “as is” and “as available” basis. We make no guarantees that the Site
              or any content is safe, accurate, or suitable for a particular purpose. Your use of the Site is at
              your own risk. We do not warrant that the Site will be uninterrupted or error‑free. We are not
              liable for any errors or omissions or for any loss or damage that may occur from your use of the
              Site.
            </p>

            <h2 className="mt-6 text-xl font-semibold">6. Limitation of Liability</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              To the fullest extent permitted by law, Feet Klaw shall not be liable for any indirect, incidental,
              special, consequential or punitive damages, including without limitation loss of profits, data, use,
              or other intangibles arising out of your access to or inability to access the Site. If, despite the
              previous paragraph, we are found liable, our liability shall not exceed the amount you have paid (if
              any) for accessing membership content during the twelve months immediately preceding the claim.
            </p>

            <h2 className="mt-6 text-xl font-semibold">7. Indemnification</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              You agree to indemnify, defend, and hold harmless Feet Klaw and its affiliates, officers, directors,
              employees, agents, and suppliers from and against any and all claims, liabilities, damages, losses,
              or expenses (including reasonable attorneys’ fees) arising out of or in any way connected with your
              access to or use of the Site, your violation of these Terms, or your violation of any law or the
              rights of a third party.
            </p>

            <h2 className="mt-6 text-xl font-semibold">8. Termination</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              We may terminate or suspend your access to all or part of the Site at any time, with or without
              notice or cause. We may also discontinue or modify any aspect of the Site at any time.
            </p>

            <h2 className="mt-6 text-xl font-semibold">9. Changes to the Terms</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              We may update these Terms from time to time. When we make material changes, we will post the
              updated Terms on this page and update the “last updated” date. Your continued use of the Site after
              such changes constitutes your acceptance of the new Terms. We encourage you to review the Terms
              periodically.
            </p>

            <h2 className="mt-6 text-xl font-semibold">10. Governing Law</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              These Terms and any dispute arising out of or related to your use of the Site shall be governed by
              and construed in accordance with the laws of the jurisdiction in which Feet Klaw operates, without
              regard to its conflict of law provisions.
            </p>

            <h2 className="mt-6 text-xl font-semibold">11. Contact</h2>
            <p className="mt-2 max-w-3xl leading-relaxed fk-text-secondary">
              If you have any questions about these Terms, please contact us using the information provided on
              the Site.
            </p>

            <div className="mt-6 text-xs" style={{ color: 'var(--text-muted)' }} data-testid="terms-legal">
              18+ only. All models are 18+.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
