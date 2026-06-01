# Joy Igbonekwu — Backend Engineer Portfolio

A clean, readable portfolio page built for the HNG Internship submission.

## Stack

- **HTML5** — semantic markup, no template engine
- **Bootstrap 5.3** — grid system, navbar, responsive utilities
- **Custom CSS** — design tokens, typography, component styles (layered on top of Bootstrap)
- **Vanilla JS** — IntersectionObserver for deep-dive ToC, smooth scroll, nav shadow

No build step. No bundler. Open `index.html` in a browser.

## Project Structure

```
portfolio/
├── index.html          ← All markup; no inline styles
├── css/
│   └── style.css       ← Design tokens + all custom component styles
├── js/
│   └── main.js         ← Interactivity (ToC observer, smooth scroll, nav)
├── assets/             ← Drop screenshots / images here when ready
└── README.md
```

## What the Portfolio Communicates

A backend engineer who:
- Owns projects end-to-end, not just a contributor to other people's tickets
- Can explain architecture decisions, not just list technologies
- Writes clearly — no buzzwords, no inflated claims
- Understands failure modes (async, retries, idempotency)

## Customising

1. Replace the placeholder name, email, GitHub, LinkedIn, and Twitter links in `index.html`
2. Swap placeholder project names/descriptions with your actual HNG work
3. Update the proof links (demo, screenshot, Swagger docs) when available
4. Drop any screenshots into `assets/` and reference them from the project cards

## Bootstrap Usage

Bootstrap provides:
- `navbar` + `navbar-expand-md` + `collapse` for the responsive nav
- `container` for max-width centering
- `row` / `col-*` for the hero two-column layout, deep-dive layout, reflection cards, and contact section
- Spacing utilities (`g-*`, `ms-auto`, `gap-*`) throughout

Everything visual — colors, typography, borders, hover states, animations — is in `css/style.css`.
