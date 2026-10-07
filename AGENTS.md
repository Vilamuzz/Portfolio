# AGENTS.md — Portfolio Project Constitution

> This file defines the non-negotiable rules for any AI agent or contributor working in this repo.
> Read this fully before writing any code or modifying structure.

---

## 1. Project Identity

- **Name:** Vilamuzz Portfolio
- **One-line description:** Showcase portfolio site for backend engineering projects, experience, and expertise.
- **Primary user:** Vilamuzz (project owner); secondary: recruiters/visitors viewing the site.
- **Current phase:** MVP (read-only showcase; no CMS, no backend, no user interactions).
- **Deployment:** Infinity Free FTP via GitHub Actions (master branch → `/htdocs/`).

---

## 2. Tech Stack (Exact Versions)

- **Framework:** Vue 3.5.38 (Composition API + `<script setup>`)
- **Router:** vue-router 5.1.0 (client-side, SPA)
- **State Management:** Pinia 3.0.4 (installed but **unused** — do not use without owner approval)
- **Styling:** Tailwind CSS 4.3.2 + @tailwindcss/vite 4.3.2
- **Icons:** @lucide/vue 1.26.0 (icon library)
- **Animations:** GSAP 3.15.0 + Lenis 1.3.25 (smooth scroll + timeline animations)
- **Build Tool:** Vite 8.0.16
- **Package Manager:** pnpm
- **Node version:** 22.18.0 or 24.12.0+
- **Linting:** ESLint 10.5.0 + Oxlint 1.69.0 + Prettier (eslint-config-prettier 10.1.8)
- **Formatting:** Oxfmt 0.54.0
- **Vue tooling:** vue-eslint-parser 10.4.1, eslint-plugin-vue 10.9.2

**No testing framework installed yet.** Add Playwright or Vitest only with explicit approval.

---

## 3. Folder Structure (Enforce This)

```
vilamuzz-portfolio/
├── src/
│   ├── App.vue                          # Root component: <RouterView /> + Lenis
│   ├── main.js                          # Entry point: creates app, registers router
│   ├── index.css                        # Global styles (Tailwind imports)
│   ├── components/
│   │   ├── AppHeader.vue                # Shared header (navigation + branding)
│   │   ├── AppFooter.vue                # Shared footer (social links)
│   │   └── ComingSoon.vue               # Placeholder for future pages
│   ├── pages/
│   │   ├── HomePage.vue                 # / — Hero + featured projects + expertise intro
│   │   ├── ProjectPage.vue              # /projects — Full project showcase
│   │   ├── ExpertisePage.vue            # /expertise — Skills & tech stack
│   │   ├── ExperiencePage.vue           # /experience — Work experience timeline
│   │   └── NotFoundPage.vue             # /:pathMatch — 404 handler
│   ├── composables/
│   │   ├── useLenis.js                  # Smooth scroll lifecycle
│   │   └── animations/
│   │       ├── useButtonAnimation.js    # Generic button hover/click animations
│   │       ├── useTextAnimation.js      # Text reveal, fade animations
│   │       ├── useExperiencePageAnimation.js     # /experience page animations
│   │       ├── useExpertisePageAnimation.js      # /expertise page animations
│   │       ├── useProjectPageAnimation.js        # /projects page animations
│   │       └── homepage/
│   │           ├── useHeroAnimation.js          # Hero section animations
│   │           ├── useProjectAnimation.js       # Featured projects on home
│   │           ├── useExperienceAnimation.js    # Experience intro on home
│   │           ├── useExpertiseAnimation.js     # Expertise intro on home
│   │           ├── useContactAnimation.js       # Contact section on home
│   │           └── useHomePageAnimation.js      # Master page orchestration
│   ├── data/
│   │   ├── projects.json                # [SCHEMA BELOW] Project metadata
│   │   ├── projectServices.json         # Tech/service tags per project
│   │   ├── experience.json              # Work experience, certificates & achievements
│   │   ├── expertise.json               # Skills & proficiencies
│   │   └── [SCHEMA RULES BELOW]
│   └── router/
│       └── index.js                     # Route definitions (5 flat routes, no nesting)
├── docs/
│   ├── agents.md                        # This file
│   ├── prd.md                           # Product requirements
│   ├── trd.md                           # Technical requirements
│   └── CHANGELOG.md                     # Deployment + version history
├── .github/
│   └── workflows/
│       └── cicd.yaml                    # CI/CD: lint → build → FTP deploy
├── vite.config.js                       # Vite build config (Vue plugin, dev server)
├── index.html                           # HTML entry point
├── package.json                         # Dependencies
├── jsconfig.json                        # JS config (module resolution)
├── eslint.config.js                     # ESLint rules
├── .eslintignore                        # ESLint ignore patterns
├── .oxlintrc.json                       # Oxlint config
├── .oxfmtrc.json                        # Oxfmt config
├── .editorconfig                        # Editor settings
└── .env.example                         # [CREATE IF NEEDED] Template for env vars

```

**Sacred rules:**

- All pages **must** import `AppHeader` and `AppFooter` and wrap content in a shared container.
- All animations **must** use composables (no inline GSAP in templates).
- `data/*.json` files are the **single source of truth** — never hardcode project/experience data in components.

---

## 4. Data Schema Rules

### `src/data/projects.json`

**Schema:**

```json
[
  {
    "id": "nyuwi-creation", // Unique identifier (slug format)
    "tag": "Web App", // Project category (or "Mobile App", "CLI Tool", etc.)
    "title": "Nyuwi Creation", // Project title
    "description": "Handicraft marketplace...", // 1-2 sentence summary
    "year": "2024", // Completion year
    "role": "Backend Developer", // Your role on the project
    "technologies": ["Go", "PostgreSQL", "Redis"], // OR reference projectServices.json
    "bgClass": "bg-primary", // Tailwind class for hero background
    "img": "/img/handicraft.jpg", // Image path (relative to public/)
    "link": "https://github.com/Vilamuzz/...", // GitHub/demo link
    "featured": true, // Show on homepage? (optional, default: false)
    "status": "completed" // "completed" | "in-progress" | "archived"
  }
]
```

**Validation rules:**

- `id` must be kebab-case, unique, immutable.
- `img` must exist in `public/img/`.
- `link` must be a valid HTTPS URL.
- `technologies` must match entries in `expertise.json` (or document the mapping in `projectServices.json`).
- All strings are required unless marked `(optional)`.

### `src/data/experience.json`

Single source of truth for work experiences, certificates, and achievements.

**Schema for `experience.json`:**

```json
{
  "workExperiences": [
    {
      "id": "exp-1",
      "company": "PT. Solutionlabs Indonesia",
      "logo": "/img/solutionlabs.jpeg",
      "role": "Fullstack Developer",
      "type": "Internship",
      "period": "Aug 2025 — Feb 2026",
      "location": "Indonesia",
      "description": "Architected and delivered scalable web applications...",
      "skills": ["Vue 3", "Node.js", "PostgreSQL", "Tailwind CSS", "Golang", "Docker", "REST API"]
    }
  ],
  "certificates": [
    {
      "id": "cert-1",
      "title": "MikroTik Certified Network Associate",
      "issuer": "Mikrotikls SIA",
      "issueDate": "2026",
      "credentialId": "2605NA4259",
      "link": "https://mikrotik.com/certificates",
      "skills": ["IP Architecture", "Routing", "Wireless", "Switching"]
    }
  ],
  "achievements": [
    {
      "id": "achieve-1",
      "title": "Participant of Olimpiade Vokasi Indonesia",
      "organization": "Universitas Sebelas Maret",
      "year": "2023",
      "award": "Participant",
      "description": "Participant in the National Vocational Olympics...",
      "tags": []
    }
  ]
}
```

### `src/data/expertise.json`

**Schema:**

```json
{
  "languages": [
    { "name": "Go", "proficiency": "Advanced", "years": 1 },
    { "name": "JavaScript", "proficiency": "Intermediate", "years": 2 }
  ],
  "frameworks": [
    { "name": "Vue 3", "proficiency": "Intermediate", "years": 1 },
    { "name": "Laravel", "proficiency": "Intermediate", "years": 1 }
  ],
  "databases": [
    { "name": "PostgreSQL", "proficiency": "Intermediate", "years": 1 },
    { "name": "Redis", "proficiency": "Beginner", "years": 0.5 }
  ],
  "tools": ["Git", "Docker", "Linux", "GitHub Actions"]
}
```

---

## 5. Routing Rules (Flat, SPA)

**Routes (defined in `src/router/index.js`):**

| Path               | Component      | Lazy-loaded? | Nested? |
| ------------------ | -------------- | ------------ | ------- |
| `/`                | HomePage       | YES          | NO      |
| `/projects`        | ProjectPage    | YES          | NO      |
| `/expertise`       | ExpertisePage  | YES          | NO      |
| `/experience`      | ExperiencePage | YES          | NO      |
| `/:pathMatch(.*)*` | NotFoundPage   | YES          | NO      |

**Rules:**

- **No nested routes or layouts.** All routes are flat siblings.
- Each page **must** import and render `AppHeader` + `AppFooter` itself.
- `NotFoundPage` is the catch-all; render it with custom content (no header/footer).
- Use `RouterLink` for navigation; never use `<a href="/">` for internal routes.
- Route names are optional but should match component names (e.g., `name: 'HomePage'`).

---

## 6. Deployment & Environment Rules

### GitHub Actions CI/CD (`cicd.yaml`)

- Triggers: `push` to `master`, or `pull_request` against `master`.
- Steps:
  1. Checkout repo
  2. Setup Node 20
  3. `pnpm install`
  4. `pnpm run build` (outputs to `dist/`)
  5. FTP deploy `dist/*` → `/htdocs/` on Infinity Free

### Environment Variables

- **Currently:** None required (static site).
- **If adding (e.g., contact form, API calls):**
  1. Create `.env.example` documenting all required vars.
  2. Add to `.gitignore`: `.env`, `.env.local`, `.env.*.local`
  3. Reference in code via `import.meta.env.VITE_*` (Vite prefix required).
  4. Add secrets to GitHub repo settings before deploying.

### Base URL

- **Current:** Portfolio lives at domain root (`/`).
- **If moving to subdirectory:** Update `vite.config.js` `base: '/subdir/'` and router history mode if needed.

---

## 7. Iron Rules (Never Break These)

1. **Never use `any` in code.** All data is `.json` (statically typed). Use `const` + JSDoc or TypeScript if needed.
2. **Never commit secrets** (API keys, FTP credentials). Use `.env` + GitHub Secrets.
3. **Never install a dependency without asking.** Justify why, check alternatives.
4. **Never delete or rename files** without explicit owner approval (breaks URLs, images, imports).
5. **Never push to `master` without passing:**
   - `pnpm run lint` (ESLint + Oxlint clean)
   - `pnpm run build` (Vite build succeeds)
6. **Never hardcode data.** All content (projects, experience, expertise) **must** live in `src/data/*.json`.
7. **Never modify `.github/workflows/`** or deployment config without owner approval.
8. **Always use Composition API** (`<script setup>`); never use Options API in new components.
9. **Always use Tailwind utility classes** for styling; no inline `<style>` unless absolutely necessary.
10. **Always lazy-load pages** in router; use `() => import('./pages/X.vue')`.

---

## 8. Code Style Guide

### Vue 3 Components

```vue
<script setup>
// Imports (standard library, then pnpm, then local)
import { ref, computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";

// Props with types (JSDoc)
/** @type {import('vue').PropType<Project>} */
const project = defineProps({
  project: Object,
});

// Reactive state
const isOpen = ref(false);

// Computed properties
const title = computed(() => project.title.toUpperCase());

// Methods (arrow functions preferred)
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// Lifecycle
onMounted(() => {
  console.log("Mounted");
});
</script>

<template>
  <div class="container mx-auto">
    <!-- Use kebab-case for components -->
    <app-header />

    <!-- Bind data with `:` -->
    <h1 :class="{ 'text-lg': isOpen }">{{ title }}</h1>

    <!-- Events with `@` -->
    <button @click="toggleMenu" class="btn btn-primary">Toggle</button>
  </div>
</template>
```

**File naming:**

- Components: PascalCase + `.vue` → `AppHeader.vue`, `ProjectCard.vue`
- Pages: PascalCase + `.vue` → `HomePage.vue`, `ProjectPage.vue`
- Composables: kebab-case + `.js` → `use-lenis.js`, `use-button-animation.js`
- Data files: kebab-case + `.json` → `projects.json`, `project-services.json`

**No comments** explaining _what_ code does (code is self-documenting). Add comments only for _why_ if non-obvious:

```javascript
// BAD
const x = projects.filter((p) => p.featured); // Filter featured projects

// GOOD
// Show only pinned projects on homepage (improves visibility)
const featuredProjects = projects.filter((p) => p.featured);
```

### Animations (GSAP)

```javascript
// composables/animations/useHeroAnimation.js
import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";

export function useHeroAnimation(containerRef) {
  let timeline;

  onMounted(() => {
    if (!containerRef.value) return;

    timeline = gsap.timeline();
    timeline.from(".hero-title", { duration: 0.8, opacity: 0, y: 20 });
    timeline.from(".hero-subtitle", { duration: 0.6, opacity: 0 }, "-=0.4");
  });

  onUnmounted(() => {
    timeline?.kill();
  });

  return { timeline };
}
```

Use in components:

```vue
<script setup>
import { ref } from "vue";
import { useHeroAnimation } from "@/composables/animations/useHeroAnimation";

const containerRef = ref(null);
useHeroAnimation(containerRef);
</script>

<template>
  <div ref="containerRef" class="hero">
    <h1 class="hero-title">Welcome</h1>
    <p class="hero-subtitle">Portfolio</p>
  </div>
</template>
```

---

## 9. Workflow Protocol

When assigned a task (by owner or PR):

1. **Read** — Understand the task fully. Read relevant files, this agents.md, and `/docs/prd.md` + `/docs/trd.md` if they exist.
2. **Ask** — If unclear, ask for clarification (don't guess). Prioritize owner approval.
3. **Plan** — Output a bullet list of files to create/modify and why. **Wait for approval.**
4. **Implement** — Write code in small, verifiable steps. Commit frequently with clear messages.
5. **Verify** — Run `pnpm run lint && pnpm run build`. Confirm no errors.
6. **Test** — Manually test the feature in dev server (`pnpm run dev`).
7. **Log** — Append a summary to `/docs/CHANGELOG.md` (date, change, files affected).
8. **Submit** — Open a PR or commit to `master` (if owner), with a summary comment.

**Commit message format:**

```
feat: add project filtering by technology
- Added tech filter buttons to ProjectPage
- Updated projectCard component with category badge
- Modified projects.json schema to include technologies

Closes #X
```

---

## 10. What You Must Not Touch

- `.github/workflows/` — CI/CD config
- `vite.config.js` — Build config (unless upgrading Vite with approval)
- `package.json` → `engines` field (Node version constraint)
- `.env*` files (never commit)
- `public/` folder structure (if it exists) — images/assets must match `data/*.json` paths

---

## 11. Security & Performance

- **Images:** Optimize before commit (use `next/image` equivalent if adding SSG later).
- **External links:** Always use `https://`, open in new tab (`target="_blank" rel="noopener noreferrer"`).
- **JSON data:** Keep file sizes < 500KB (all projects + experience + expertise combined).
- **Animations:** Profile in DevTools; keep frame rate ≥ 60fps. Disable GSAP animations on mobile if needed.

---

## 12. Glossary & FAQs

**Q: Can I add state management (Pinia)?**  
A: Only with owner approval. Currently unnecessary (static data).

**Q: Can I use TypeScript?**  
A: JSDoc + `.js` is fine for now. Convert to TypeScript only if complexity demands it.

**Q: Why duplicate data files (experience.json + experienceData.json)?**  
A: **Resolved.** Merged into `src/data/experience.json` containing `workExperiences`, `certificates`, and `achievements`. `experienceData.json` deleted.

**Q: How do I test locally before deploying?**  
A: `pnpm run dev` (Vite dev server), then `pnpm run build && pnpm run preview` (production build preview).

**Q: What if Infinity Free goes down?**  
A: Add alternative deployment (Vercel, Netlify) to `.github/workflows/` as backup step.

---

## Remember

✅ Always validate input data (JSON schemas).  
✅ Keep animations lightweight (profile with DevTools).  
✅ Ask before breaking any iron rule.  
✅ Test locally before pushing to `master`.  
✅ Keep deployment smooth — clear commit messages help.

---

**Last Updated:** 2025-10-07  
**Owner:** Vilamuzz
