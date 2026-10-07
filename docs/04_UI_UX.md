# UI/UX Brief — Vilamuzz Portfolio

> This document defines the visual design system, interaction patterns, component guidelines, and screen specifications for Vilamuzz Portfolio.
> Complements `docs/01_PRD.md` (Product Requirements), `docs/02_TRD.md` (Technical Architecture), and `AGENTS.md` (Project Constitution).

---

## 1. Design Principles

- **High-Contrast Dark Aesthetics:** Sleek, modern dark-mode canvas paired with vibrant electric yellow/amber accents (`#ffd60a`) and high-impact inverted yellow pages.
- **Motion-Driven Storytelling:** Smooth scroll physics powered by Lenis combined with choreographed GSAP timelines (parallax scroll triggers, pinned horizontal showcases, hover micro-interactions).
- **Recruiter-Centric Scannability:** Prioritize immediate access to core engineering competencies, live projects, GitHub source code, and work history milestones.
- **Performance & Smoothness:** Maintain a strict 60 fps animation frame rate without layout thrashing; keep static bundle sizes minimal and client-side page transitions instant.
- **Mobile-First Responsiveness:** Touch-friendly interfaces with large tap targets, fluid grid layouts, and an immersive full-screen slide-down navigation menu on mobile viewports.

---

## 2. Visual Style & Design Tokens

### Color Palette

Derived directly from Tailwind CSS v4 `@theme` configuration in `src/index.css`:

| Token                      | Hex / Value | Usage                                                                                                                           |
| -------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `--color-primary`          | `#ffd60a`   | Vibrant yellow accent, primary CTAs, text highlights, inverted page canvases (`/projects`, `/expertise`)                        |
| `--color-secondary`        | `#ffc300`   | Warm amber gold, secondary highlights and hover gradients                                                                       |
| `--color-brand-black`      | `#000814`   | Deepest base canvas background for dark-mode pages (`/`, `/experience`, `/404`)                                                 |
| `--color-brand-navy`       | `#001d3d`   | Card surfaces, container backgrounds, image placeholders, navigation backdrop                                                   |
| `--color-brand-blue`       | `#003566`   | Navigation pill buttons, interactive badges, secondary surfaces                                                                 |
| `--color-brand-blue-light` | `#00509d`   | Accent borders and subtle highlight details                                                                                     |
| Neutrals & Text            | `#ffffff`   | Primary text (`text-white`), muted text (`text-white/70`, `text-white/50`, `text-white/40`), subtle borders (`border-white/10`) |
| Inverted Neutrals          | `#000000`   | Text and borders on inverted primary yellow pages (`text-black`, `text-brand-black/80`, `border-black`)                         |

### Typography

- **Primary Font Family:** `Plus Jakarta Sans` (Google Fonts, weights 200–800) with system fallback stack:
  ```css
  font-sans:
    "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  ```
- **Scale & Hierarchy:**
  - **Display / Hero Titles:** ExtraBold (`font-extrabold`), tight tracking (`tracking-tight`, `tracking-tighter`), sizes from `text-5xl` to `text-7xl` (and `text-[28vw]` on 404 background).
  - **Section Headings:** Bold (`font-bold`), sizes `text-3xl` to `text-4xl`.
  - **Body Text:** Regular to Medium (`font-normal` / `font-medium`), relaxed line-height (`leading-relaxed`), sizes `text-base` to `text-lg`.
  - **Metadata & Tags:** Monospace (`font-mono text-xs`), uppercase tracking (`tracking-wider`, `tracking-widest`).

### Radii & Borders

- **Pill Shapes (`rounded-full`):** Used for navigation toggle buttons, category filter tabs, status badges, and primary action buttons.
- **Card Corners (`rounded-xl`, `rounded-2xl`, `rounded-lg`):** Used for company logos, media containers, and modal dialogs.
- **Divider Lines:** Clean, sharp dividers using `border-white/10` on dark pages and `border-black` on inverted yellow pages.

### Elevation & Visual Effects

- **Backdrop Blur:** Frosted glass effect (`backdrop-blur-md`, `bg-brand-navy/95`) on the full-screen navigation overlay.
- **Noise / Grain Texture:** SVG procedural turbulence overlay (`opacity-[0.04]`) applied to give tactile depth on special screens (e.g. 404 page).
- **Canvas Particles:** Dynamic HTML5 canvas drifting particles on the 404 page for atmospheric depth.
- **Image Hover Effects:** Subtle scale zooms (`group-hover:scale-105`, `duration-700`) within masked overflow containers.

---

## 3. Component Library & Tech Stack

- **Framework:** Vue 3.5 (Composition API, `<script setup>`).
- **Styling Engine:** Tailwind CSS 4.3.2 + `@tailwindcss/vite`.
- **Icon System:** `@lucide/vue` 1.26 (monochrome SVG icons: `ArrowUpRight`, `ArrowDown`, `Briefcase`, `Calendar`, `MapPin`, `Trophy`, `ShieldCheck`, `Zap`, `Link`, etc.).
- **Motion & Scrolling:** GSAP 3.15 + ScrollTrigger + Lenis 1.3 (global smooth scroll).
- **Navigation:** Vue Router 5 (client-side, flat SPA routing with `<RouterLink>`).

### Shared Components

#### `AppHeader.vue`

- Fixed top navigation bar (`fixed top-0 left-0 w-screen px-10 py-8 z-50`).
- Branded logo linking to `/`.
- Pill toggle button (`MENU` / `CLOSE`) with tactile active scale animation (`active:scale-95`).
- Full-screen slide-down menu overlay (`#navigation-menu`):
  - GSAP timeline animation sliding from `100%` to `0%` on open.
  - Pauses Lenis smooth scrolling when open, resumes on close or unmount.
  - Large typography navigation links (`Projects`, `Experiences`, `Expertise`).
  - Social media links (LinkedIn, GitHub, Instagram, Twitter, Email).

#### `AppFooter.vue`

- Contact section (`#contact`) placed at the bottom of major pages.
- Large interactive email call-to-action (`vilamuzz@gmail.com`).
- ScrollTrigger parallax and stagger entrance animations on footer headings and social links.
- Social links with external HTTPS links, Lucide icons, and `rel="noopener noreferrer"`.

#### `ComingSoon.vue`

- Reusable placeholder component for unfinished or upcoming sections.

---

## 4. Layouts & Navigation Architecture

- **Flat Architecture:** All routes are flat siblings defined in `src/router/index.js`. There is no nested layout wrapper component.
- **Per-Page Layout Inclusion:** Each page component (`HomePage`, `ProjectPage`, `ExperiencePage`, `ExpertisePage`) independently imports and renders `AppHeader` and `AppFooter`.
- **404 Standalone Layout:** `NotFoundPage.vue` operates without `AppHeader` or `AppFooter` for a distraction-free, focused recovery experience.
- **Smooth Scroll Integration:** Lenis smooth scrolling is initialized globally in `App.vue` and lifecycle-managed via `useLenis.js`.

---

## 5. Key Screens

### 5.1 Homepage (`/` — `HomePage.vue`)

- **Hero Section:**
  - Interactive name morph: "Hi, I'm" with hover transition switching between "Andy" and "Vilamuzz" (electric yellow).
  - Title: "Fullstack Developer" in primary yellow.
  - Bio: Concise statement of technical focus.
  - Action CTA: "Download CV" pill button with interactive hover ripple effect and animated down-arrow badge.
- **Featured Projects Showcase:**
  - Horizontal pinned scroll section using GSAP ScrollTrigger to display pinned projects (`featured: true` in `projects.json`).
  - Image preview, project role, tag, year, and external GitHub link.
- **Experience Snapshot:**
  - Highlighting current or most recent engineering engagement.
  - Direct router link to full `/experience` timeline.
- **Expertise Snapshot:**
  - Highlighting primary technologies and core proficiencies.
  - Direct router link to full `/expertise` breakdown.
- **Contact Footer:**
  - Integrated `AppFooter` with contact headline and social links.

### 5.2 Projects Catalog (`/projects` — `ProjectPage.vue`)

- **Inverted Theme:** Styled with `bg-primary text-brand-black` for high-impact visual contrast.
- **Header:** Large display title ("Projects") and craft philosophy statement.
- **Category Filter Tabs:**
  - Filter pills: `All`, `Fullstack`, `Frontend`, `Backend`.
  - Active pill highlighted with `bg-brand-black text-primary border-brand-black`; inactive pills use subtle hover states.
- **Project Grid:**
  - 1-column on mobile, 2-column on desktop with border grid lines (`border-black`).
  - Each card displays project title, role, masked image preview with hover zoom (`group-hover:scale-105`), category tag, and completion year.
  - Clicking any card opens the project repository or demo in a new tab (`target="_blank" rel="noopener noreferrer"`).
- **Empty State:**
  - Rendered when no projects match the selected category filter.
  - Displays a clean vector icon, "No Projects Found" heading, and reassuring subtext.

### 5.3 Experience Page (`/experience` — `ExperiencePage.vue`)

- **Dark Theme:** Deep dark canvas (`bg-brand-black text-white`).
- **Hero Header:** "Experience & Achievements." with muted subtitle.
- **Work & Internship Experience Section:**
  - Timeline cards (`experience-card`) with hover border glow (`hover:border-primary`).
  - Left column: Company logo (or fallback `Briefcase` icon), company name, employment type badge (`Internship`, `Full-time`), period date range, and location.
  - Right column: Position title, detailed narrative description, bullet points of key technical accomplishments, and technology badges.
- **Certifications & Achievements Section:**
  - Structured display for verified professional certificates and competition awards.

### 5.4 Expertise Page (`/expertise` — `ExpertisePage.vue`)

- **Inverted Theme:** High-contrast electric yellow canvas (`bg-primary text-black`).
- **Header:** "My Expertise & Craft" headline with supporting philosophy statement.
- **Speech / Pitch Cards:**
  - Three distinct cards ("Engineering with Purpose", "Craft & Performance", "Scalable Architecture") detailing engineering values and technical standards.
- **Categorized Development Domains:**
  - Pills for front-end, back-end, fullstack, DevOps/cloud infrastructure, and performance optimization.
- **Technology Badges:**
  - Comprehensive badges for tools and frameworks: Vue 3, Go / Golang, PostgreSQL, Docker, Redis, Tailwind CSS, GSAP, etc.

### 5.5 404 Not Found (`/:pathMatch(.*)*` — `NotFoundPage.vue`)

- **Standalone Canvas:** Centered full-screen layout on `bg-brand-black` without header or footer.
- **Atmospheric Background:**
  - Massive glitching background number (`text-[28vw] font-black text-white/[0.03]`).
  - SVG noise grain overlay (`opacity-[0.04]`).
  - Animated HTML5 canvas drifting particles.
- **Error Content:**
  - "ERROR 404" tracking badge in primary yellow.
  - Bold "Page not found" headline and helpful guiding subtext.
  - "Back to Home" pill button with arrow icon linking back to `/`.

---

## 6. Content & Interaction Standards

- **Language:** English across all UI elements, headings, tags, and navigation labels.
- **External Links:** Always configured with `target="_blank" rel="noopener noreferrer"` to prevent reverse tabnabbing and preserve SPA state.
- **Internal Navigation:** Always use Vue Router `<RouterLink>` components; never use standard `<a href="...">` for internal SPA routes.
- **Animation Hygiene:**
  - All GSAP animations must be encapsulated within composables (`src/composables/animations/`).
  - Timelines and ScrollTrigger instances must be created inside `gsap.context()` and properly reverted on component unmount (`ctx?.revert()`).
  - Lenis smooth scrolling must pause when the full-screen menu modal is active to prevent background scroll leaks.

---

## 7. States & Feedback

| State                   | Required UI Pattern                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Loading**             | Client-side routing with lazy-loaded route chunks (`() => import(...)`). Fast initial bundle load under 2 seconds.                  |
| **Empty State**         | Display friendly vector illustration, clear "No Projects Found" heading, and helpful subtext on category filtering.                 |
| **Hover / Interaction** | Micro-animations on all interactive elements: button scale effects (`active:scale-95`), image zoom on cards, and color transitions. |
| **Focus State**         | Accessible focus rings on interactive controls and keyboard navigability throughout.                                                |
| **Active Navigation**   | Visual distinction for active category filters and visible menu indicator states (`MENU` ↔ `CLOSE`).                                |

---

## 8. Responsive Design Requirements

- **Breakpoints:**
  - **Mobile:** `< 640px` (single-column cards, touch-optimized full-screen drawer menu).
  - **Tablet:** `640px – 1024px` (balanced padding, responsive grids).
  - **Desktop:** `> 1024px` (multi-column grids, horizontal pinned scroll sections, full desktop header).
- **Touch Targets:** Interactive controls (pills, buttons, links) have a minimum tap area of 44 × 44 px.
- **No Horizontal Overflow:** All layouts must strictly prevent accidental horizontal scrollbars across all screen widths.

---

## 9. Accessibility (WCAG 2.1 AA)

- **Color Contrast:** High contrast between text and backgrounds (white on `#000814` for dark pages; black on `#ffd60a` for inverted pages) meeting WCAG AA requirements.
- **Semantic Structure:** Clear HTML5 document outline using `<nav>`, `<header>`, `<main>`, `<section>`, and `<footer>`. Single `<h1>` per view.
- **Image Accessibility:** Informative images must provide meaningful `alt` attributes based on project titles or company names. Decorative elements use `aria-hidden="true"`.
- **Keyboard Navigation:** Full keyboard navigation support (Tab / Shift+Tab) across all links, buttons, and navigation controls.

---

**Last Updated:** 2026-10-07  
**Owner:** Vilamuzz  
**Status:** MVP (Active)
