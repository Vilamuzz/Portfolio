# App Flow — Vilamuzz Portfolio

## Screen Inventory

| Screen     | Route              | Auth Required | Lazy-loaded | Purpose                                                        |
| ---------- | ------------------ | ------------- | ----------- | -------------------------------------------------------------- |
| Home       | `/`                | No            | Yes         | Hero, featured projects, experience/expertise intro, CTAs      |
| Projects   | `/projects`        | No            | Yes         | Full project grid, filterable by technology                    |
| Expertise  | `/expertise`       | No            | Yes         | Skills grouped by category (languages, frameworks, DBs, tools) |
| Experience | `/experience`      | No            | Yes         | Timeline of work experience with accomplishments               |
| Not Found  | `/:pathMatch(.*)*` | No            | Yes         | 404 fallback, no header/footer, link back home                 |

No auth, no roles — every route is public and identical for all visitors.

---

## Key Flows

### Flow 1: Recruiter Discovery

```
1. Recruiter lands on `/` (Home)
   → Sees hero (name, title, intro)
   → Sees 2–3 featured projects (projects.json: featured === true)
   → Sees experience snapshot (latest entry) and top skills

2. Clicks "View All Projects" → `/projects`
   → Browses full grid (all entries from projects.json)
   → Optionally filters by technology (e.g. "Go")
   → Clicks a project card → opens GitHub link in new tab (external, leaves SPA)

3. Clicks "View Experience" → `/experience`
   → Scrolls timeline, entries animate in on scroll
   → Reads company, duration, highlights, tech used per entry

4. Clicks "View Skills" → `/expertise`
   → Scans skills grouped by category with proficiency + years

5. Clicks social/footer links (GitHub, LinkedIn, Email)
   → Opens in new tab, rel="noopener noreferrer"
```

### Flow 2: Direct Navigation / Return Visit

```
1. Visitor arrives via direct link (e.g. shared `/projects` URL)
   → Vue Router resolves route client-side, loads only that page's chunk
   → AppHeader + AppFooter render (imported per-page, not from a shared layout)

2. Visitor uses header nav to move between Projects / Expertise / Experience
   → RouterLink triggers client-side transition (no full page reload)
   → Lenis smooth-scroll resets per page; GSAP entrance timeline re-runs
```

### Flow 3: Broken or Unknown Route

```
1. Visitor hits a URL with no matching route (typo, stale link, removed page)
   → `/:pathMatch(.*)*` catches it → NotFoundPage
   → Minimal styling, no header/footer
   → "Page not found" message + button back to `/`
```

---

## Content Update Flow (Owner, Local — not a web flow)

This replaces the "Admin Dashboard" flows from the e-commerce template: there's no in-browser admin panel, because the site has no backend. Updates happen by editing JSON and redeploying.

```
1. Owner edits src/data/projects.json (or experience.json / expertise.json) locally
   → Adds/updates an entry per the schema in agents.md
   → Runs `pnpm run dev` → manually verifies the change renders correctly

2. Owner runs `pnpm run lint && pnpm run build`
   → Must pass with 0 errors before proceeding

3. Owner commits and pushes to `master`
   → GitHub Actions triggers: checkout → pnpm install → lint → build → FTP deploy
   → dist/* pushed to Infinity Free /htdocs/

4. Change is live (~2–5 min after push)
   → No manual FTP, no server restart, no DB migration — static files only
```

---

## Edge Cases & Error Handling

| Scenario                                       | Handling                                                                                 |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Unknown/removed route                          | Caught by `/:pathMatch(.*)*` → NotFoundPage, link back to `/`                            |
| Broken `img` path in projects.json             | No fallback defined in current schema — **gap, see note below**                          |
| GitHub link returns 404 (repo renamed/deleted) | No link-health check exists — **gap, see note below**                                    |
| Build fails (lint error, bad JSON)             | CI/CD step fails before FTP deploy runs; site stays on last good deploy                  |
| Slow animation on low-end mobile               | Profile in DevTools; PRD allows disabling GSAP on mobile if frame rate drops below 60fps |
| JSON combined size exceeds 500KB               | Not currently enforced by CI — **gap, see note below**                                   |

---

## Navigation Structure

```
Public Navigation (all visitors, no auth tiers):
├── Home (/)
├── Projects (/projects)
├── Expertise (/expertise)
├── Experience (/experience)
└── 404 (/:pathMatch(.*)*)

Footer (every page):
├── GitHub (external)
├── LinkedIn (external)
└── Email (external, mailto:)
```

---

**Last Updated:** 2025-10-07
**Owner:** Vilamuzz
