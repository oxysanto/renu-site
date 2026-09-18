# ReNU 11804 — Agent + Edit Guide

This file is read by AI agents (and humans) before making ANY change to the site.
It points at the design contract and records the project's standing decisions so
they are not renegotiated per edit.

## Required reading before any UI work

1. `DESIGN.md` — the design system: theme, colors (incl. the blue accent
   and its single-accent rule), type, layout, tone, anti-generic constraints.
2. This file for the standing context below.

## Standing context (keep in sync as the team changes)

- **Team:** ReNU #11804, founded 2026, first FRC season 2027. School: Özel İzmir
  Atatürk OSB Nedim Uysal MTAL, Çiğli/İzmir. Brand story: "renew" + "NU"
  (Nedim Uysal); logo is winged horse Tulpar from Turkish mythology.
- **Departments (üyeler):**
  - Mekanik (4): Demir Sönmezer, Doruk Çınar, Yaren Döker, Malika Khazova
  - Elektrik & Elektronik (3): Çınar Baran, Barış Esenli, Fatma Çataler
  - Yazılım (3): Burak Zeren, Egemen Ertuğral, İlayda İnce
  - İletişim & Medya (5): Doruk Özdava, İsra Beren Bilgiç, Can Alkan, Beril
    Ersavaş, Yağmur Küpeli
- **Koçlar (öğretmen):** Yaren Çelik, Nazlıcan Cemre Polatlı
- **Mentörler (şirket):** Selman Dinç (Boeing), Gamze Kurt (3M), Metehan
  Arslan (Dow)
- **Contact:** frcrenu@gmail.com · Instagram @frcrenu · TikTok @frc.renu
- **Address:** Atatürk OSB, 10038. Sk. 13 A, 35620 Çiğli/İzmir
- **Hosting:** Vercel — `https://renu-site.vercel.app`. The `.htaccess` file is
  for Apache only and is ignored by Vercel (do not rely on it); headers are
  set via `vercel.json`.
- **Sponsors:** Boeing (sole sponsor so far; logo at `assets/boeing.png`).
- **Analytics:** GA4 via cookie-consent gate in `js/main.js`
  (`GA_MEASUREMENT_ID = 'G-FT3FD86QX2'`).
- **Purpose of the site:** inform about the team, get sponsors/mentors,
  publish news. Primary CTAs always link to `iletisim.html`.

## Non-negotiables

- Follow `DESIGN.md` exactly. Do not invent colors, radii, or shadow styles.
- No filler SaaS copy. Turkish, concrete, specific to ReNU.
- Counts of "üye" in `hakkimizda.html` must match the lists above.
- If a department is edited, update BOTH the member list and the `dept-count`.
- Keep CSP meta the same shape everywhere; analytics domains already allowlisted.
- Footer/Yasal links: `gizlilik-politikasi.html`, `kullanim-kosullari.html`.
- Verify with: read the final HTML around every change. There is no build or
  test runner; correctness is by review.