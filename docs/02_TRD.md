# TRD — Vilamuzz Portfolio

## Architecture

- **Static SPA**: Vue 3.5 (Composition API, `<script setup>`) + Vue Router 5 (client-side, flat routes, no nesting)
- No backend, no API layer, no database — all content served from `src/data/*.json`, bundled at build time
- Vite 8 builds to static `dist/`, deployed via FTP to Infinity Free shared hosting (`/htdocs/`)
- Each page component independently imports `AppHeader` / `AppFooter` — no shared layout wrapper
- Global smooth-scroll (Lenis) + per-page GSAP timelines, encapsulated in composables (`src/composables/animations/`) — no inline GSAP in templates
- Routes are lazy-loaded (`() => import(...)`) for code-splitting per page

## Stack Decisions (and Why)

| Choice                        | Reason                                                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Vue 3 + Composition API       | Owner's existing proficiency; matches internship stack (Vue 3 at PT Biptek)                                     |
| Vite                          | Fast dev server, native ESM, pairs with Tailwind v4 via `@tailwindcss/vite`                                     |
| Static JSON over CMS          | No backend available on Infinity Free; MVP scope explicitly excludes CMS                                        |
| Pinia (installed, unused)     | Pre-installed for future state needs; **not wired in** — adding usage requires owner approval per agents.md §12 |
| GSAP + Lenis                  | Animation requirement in PRD §10; GSAP for timelines, Lenis for scroll feel                                     |
| FTP deploy via GitHub Actions | Infinity Free has no Git/SSH deploy hook; FTP is the only supported push mechanism                              |

## Constraints

- **Deployment target:** Infinity Free shared hosting (FTP-only, no server-side code execution)
- **Budget:** $0 hosting — rules out anything needing a server process, SSR, or serverless functions
- **Browser support:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile:** Responsive only, mobile-first breakpoints (< 640px / 640–1024px / > 1024px), no native app
- **Node version:** 22.18.0 or 24.12.0+ (per agents.md — see conflict note below)
- **No backend ⇒ no contact form, no auth, no analytics, no comments** in v1 (PRD §7)
- **JSON payload budget:** all `data/*.json` combined must stay under 500KB

## Non-Functional Requirements

- Lighthouse score ≥ 90 (perf, accessibility, best practices)
- First Contentful Paint < 2s
- Animation frame rate ≥ 60fps; disable/simplify GSAP on mobile if profiling shows jank
- WCAG 2.1 AA where applicable (alt text, semantic HTML, keyboard nav)
- 0 ESLint/Oxlint errors before merge to `master`
- CI/CD deploy completes in < 5 minutes, fails closed (lint/build failure blocks FTP step)

## Dependencies (Approved List)

### Runtime

- `vue` 3.5.38 — core framework
- `vue-router` 5.1.0 — SPA routing
- `pinia` 3.0.4 — **installed only, not used**; do not wire up without owner sign-off
- `tailwindcss` 4.3.2 + `@tailwindcss/vite` 4.3.2 — styling
- `@lucide/vue` 1.26.0 — icons
- `gsap` 3.15.0 — timeline/hover animations
- `lenis` 1.3.25 — smooth scroll

### Dev Dependencies

- `vite` 8.0.16 — build tool
- `eslint` 10.5.0, `oxlint` 1.69.0, `eslint-config-prettier` 10.1.8, `vue-eslint-parser` 10.4.1, `eslint-plugin-vue` 10.9.2 — linting
- `oxfmt` 0.54.0 — formatting

**No testing framework installed.** Adding Playwright or Vitest requires explicit owner approval (agents.md §2).

## Explicitly Rejected

- **No CMS / admin dashboard** — owner edits `data/*.json` directly and redeploys (PRD §7, Phase 4 only)
- **No backend or API layer** — Infinity Free doesn't support server-side processing (PRD FAQ)
- **No contact form (v1)** — no backend to receive submissions; Formspree/Netlify Forms deferred to Phase 2
- **No TypeScript (yet)** — JSDoc + `.js` is sufficient until complexity demands otherwise (agents.md §12)
- **No Pinia usage** — installed but inert; static JSON doesn't need cross-component shared state yet
- **No dark/light toggle, no i18n, no analytics** — out of scope for v1 (PRD §7)
- **No nested routes/layouts** — all 5 routes are flat siblings, each self-contained

## Data Flow

- Build-time data only: `projects.json`, `experience.json`, `expertise.json`, `projectServices.json` are imported directly into components — no runtime fetch, no loading states needed
- Updating content = edit JSON → `pnpm run build` → push to `master` → CI/CD rebuilds and FTPs `dist/`
- No reactive cross-page state; each page reads its own JSON slice independently
- Props flow one-directionally: JSON → page component → child components (e.g., project cards); no global store in use

## CI/CD Pipeline

1. Trigger: push to `master` or PR against `master`
2. Checkout → Node setup → `pnpm install`
3. `pnpm run lint` (must pass, 0 errors) → `pnpm run build`
4. FTP deploy `dist/*` → Infinity Free `/htdocs/`
5. No test step (none installed yet)

---

**Last Updated:** 2025-10-07
**Owner:** Vilamuzz
