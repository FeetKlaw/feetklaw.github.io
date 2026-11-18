<!--
============================================================
 Feet Klaw – Private Adult Fetish Community
============================================================
-->

# Feet Klaw
### Private Adult Fetish Community · 18+ Only · All Rights Reserved

---

> **Feet Klaw** is a private, adult-only fetish community centered on **feet and tickling**, with a strong emphasis on **consent, intimacy, discretion, and controlled access**.
>
> This website functions as the **official public-facing gateway** to the Feet Klaw ecosystem — presenting its identity, values, and membership structure, while directing all subscriptions and payments to **Patreon**.

---

## 🔞 Mandatory Age Restriction

> ⚠️ **ADULT CONTENT — ACCESS RESTRICTED TO 18+ ONLY**

By accessing this website, repository, or any related materials, you explicitly confirm that:

- You are **18 years of age or older**
- You are legally permitted to view adult content in your jurisdiction
- You understand this project contains **fetish-oriented adult themes**
- You accept full responsibility for compliance with local laws

**Access by minors is strictly prohibited and constitutes unauthorized use.**

---

## 🌐 Website Purpose & Philosophy

The Feet Klaw website is designed as a **high-end, immersive, privacy-conscious experience**, blending erotic aesthetics with modern web standards.

The site serves as:

- A **brand and identity showcase**
- A **membership gateway** (via Patreon)
- A **community access hub**
- A **trust and transparency layer** for visitors

### Design Principles

- Privacy-first architecture  
- Minimal data collection  
- Mobile-first responsiveness  
- Performance-focused media handling  
- Subtle motion and interaction  
- Clean, intentional visual hierarchy  

---

## ✨ Core Features

- 🔐 **Age-Gate Enforcement**
- 🌗 **Dark / Light Theme Toggle**
- 📱 **Fully Responsive & Mobile-Optimized**
- 📦 **Progressive Web App (PWA)** support
- 🖼 **Lazy-Loaded Galleries**
- 🎞 **Micro-Interactions & Motion Animations**
- 🧊 **Subtle 3D Hover Effects**
- 📸 **Instagram Feed Integration**
- 💬 **Discord Community Integration**

---

## 🧩 Site Sections Overview

### 🦶 Hero
- Brand identity and positioning
- Adult disclaimer
- Immediate visual impact

### 🖼 Gallery
- Performance-optimized media
- Lazy loading for discretion
- Smooth transitions

### 👥 Community
- Embedded Discord widget
- Instagram previews
- External platform access points

### 💎 Membership Tiers (via Patreon)

| Tier | Description |
|-----|------------|
| **Standard** | Base supporter access |
| **Deluxe** | Enhanced perks and visibility |
| **Legacy** | Limited tier with permanent recognition |

Each tier is displayed with:
- Custom badges
- Animated pricing cards
- Clear visual differentiation

### ❓ FAQ
- Membership clarification
- Access rules
- Consent and age policies

### 🛟 Support
- Contact pathways
- Community assistance references

### 📜 Legal
- Terms of Service
- Privacy Policy
- Explicit 18+ compliance statements

---

## 🎨 Interaction & UX Details

- Scroll-based reveal animations
- Motion-driven section transitions
- Hover depth and perspective effects
- Touch-friendly mobile interactions
- Clean typography and spacing discipline

---

## 🤝 Contributions

Contributions are accepted **only from adults (18+)**.

By contributing, you agree that:
- This is an **adult-oriented project**
- All content must remain **consensual**
- No assets, concepts, or code may be reused elsewhere
- No derivative or competing projects may be created

---

## 📬 Contact

- 📧 **Email:** feetklaw@gmail.com  
- 💬 **Discord:** Available via the website community section

---

## ⚠️ Legal Notice

- All individuals depicted are **18 years of age or older**
- All content is **consensual**
- Redistribution, scraping, AI usage, or reuse is **strictly prohibited**
- Use by minors is forbidden

---

## 📄 License & Legal Documents

- [`LICENSE`](./LICENSE) — Proprietary, All Rights Reserved  
- [`TERMS`](./TERMS.md) — Terms of Service  
- [`PRIVACY`](./PRIVACY.md) — Privacy Policy  

---

**Feet Klaw**  
*Private · Consensual · Adults Only*

## Development and publication

Use Node.js 20 and npm. Install dependencies with `npm ci`, run the local site with `npm run dev`, and generate the production files with `npm run build`.

The GitHub Pages workflow in `.github/workflows/static.yml` builds the site and publishes `dist`. The repository's `CNAME` is included in the publication to preserve the custom domain. The public introduction video is stored in `public`; its player source is configured in `src/config/site.js`.

Instagram highlights use the connected account's public Behold JSON feed. Set the repository variable `INSTAGRAM_FEED_URL` to that feed's URL. The publication workflow copies up to six posts and their media into the site daily. Generated files in `public/instagram` are excluded from version control. If a refresh fails, the workflow preserves the previously published snapshot when available. Visitors load the copies hosted by Feet Klaw; Instagram access tokens are managed by the connected service and are not stored in this repository.
