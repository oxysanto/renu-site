# ReNU 11804 — Design System

Technical / engineering-document direction. Sharp edges, hairlines, drawing-style
corner marks, ONE accent color used sparingly, zero ambient glow, zero glassmorphism.

This file exists so every future page or edit cites the same decisions. If a new
section/page is added, it must follow the values below — do not invent new colors,
radius, shadows or section patterns.

---

## 1. Theme

- **Name:** "Blueprint" — the look of a technical drawing / engineering spec.
- Recognizable signatures:
  - `corner-frame` blueprint corner marks on featured blocks.
  - Wing divider (3-dot) between sections.
  - Mono uppercase eyebrow labels with a thin rule (drawing notes).
  - Sharp 2px radius everywhere (`--radius: 2px`). No pill shapes, no large radii.
  - No drop shadows, no gradients on surfaces, no glows, no frosted glass.
- One exception to "no glow": a faint box-shadow on the cookie banner (overlay need).

## 2. Color

Each color is tied to something real in the team's story.

| Token          | Value     | Meaning                                                    |
|----------------|-----------|------------------------------------------------------------|
| `--bg`         | `#05070A` | Drafting-board black.                                      |
| `--bg-elevated`| `#0B0F16` | Raised panel on the board.                                 |
| `--bg-panel`   | `#0D1219` | Secondary panel.                                           |
| `--blue`       | `#2F72E0` | **The accent.** Engineering blue — primary CTAs, active nav, eyebrow rule. |
| `--blue-bright`| `#5C93EC` | Hover / secondary emphasis, must pass contrast.            |
| `--steel`      | `#ADB6C3` | Structural labels.                                         |
| `--steel-dim`  | `#5F6773` | Inactive / corner marks.                                   |
| `--text`       | `#ECEEF2` | Body on dark.                                              |
| `--text-dim`   | `#98A1B3` | Secondary text (≥4.5:1 on `--bg`).                         |
| `--text-faint` | `#8A93A6` | Captions / data (≥4.5:1 on `--bg`).                        |

### Rules
- Blue is the ONLY accent used as a color: primary CTA backgrounds, active nav
  underline, the hero accent word, stat numbers, the rule in eyebrows, focus
  outlines.
- Blue-bright is used for: links, hover states, secondary emphasis (member-list
  bullets, phase dots, corner marks on hover).
- Never add a second hot color. Never gradient text.

## 3. Type

- **Display:** Rajdhani 700 — titles, headings, buttons, uppercase. Squared,
  technical, "racing" feel. This is our differentiator vs generic Inter sites.
- **Body:** Inter 400–700 — paragraphs, forms.
- **Mono:** JetBrains Mono 500 — eyebrow labels, data, specs, badges, read-more.
- All fonts are self-hosted (see `fonts.css`). Do not add Google Fonts.
- Heading scale (clamp):
  - H1: `clamp(38px, 5.4vw, 62px)` (hero) / `clamp(36px, 5.5vw, 54px)` (page-hero)
  - H2: `clamp(26px, 3.6vw, 38px)`
  - H3: 18–21px
  - Body: 14.5–17.5px; Mono labels: 11.5–14.5px.
- Titles are uppercase via `text-transform`. Never use ALL CAPS in serif-like
  light faces; Rajdhani is built for it.

## 4. Layout

- **Navigation:** top fixed bar (76px), mobile slide-down panel under 900px.
- **Content width:** `--max-w: 1180px`, edge padding 32px (20px under 720px).
- **Vertical rhythm:** sections 100px padding desktop, 68px mobile.
- **Page shapes:** hero + body sections per page. Two-column grids are
  asymmetric (0.9fr / 1.1fr style) — never two mirrored equal columns.
- Do NOT repeat the same grid rhythm twice in a row on one page; vary the
  section treatments (spec row, editorial list, stepped process, hairline grid).

## 5. Tone

- Density: spare → moderate. Nothing cramped, nothing padded for padding.
- Copy: concrete, Turkish, team-specific. No filler SaaS words
  (unlock / seamless / empower / transform). If a sentence could describe
  another team's site, rewrite it.
- Motion: reveal-on-scroll (IntersectionObserver) only; reduced-motion honored.
  Status dot pulse is the single decorative animation.
- Humor allowed only where the brand shows (e.g., 404 copy).

---

## Anti-generic constraints (enforced on every page)

- **One eyebrow per section at most** — never stack them, and never reuse the
  same label text twice on a page (labels must say something different each time).
- No three identical icon/feature cards in a row. Variants: numbered editorial
  rows, hard spec tables, stepped pipelines.
- No "one-sided colored border" cards.
- No empty placeholder boxes (e.g., empty sponsor slots) — if a thing does not
  exist yet, write the honest copy instead.
- Every CTA says what happens next.
- Every image and link has alt text / meaningful label. No lorem ipsum ever.

## Fonts & assets

- `assets/fonts/*.woff2` self-hosted.
- `assets/og-image.png` is the official social preview (1200×630), blue accent
  on `#05070A`. Regenerate with the same palette, never an image model.
- `assets/logo.png` is the only logo.