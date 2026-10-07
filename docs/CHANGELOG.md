# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### 2026-10-07
- **docs(ui-ux):** Rewrite `docs/04_UI_UX.md` to match Vilamuzz Portfolio
  - Replaced legacy e-commerce (Nyuwi Creation) specification with portfolio design system.
  - Documented Tailwind CSS v4 color tokens (`#ffd60a`, `#ffc300`, brand blues/navies/blacks) and `Plus Jakarta Sans` typography.
  - Added GSAP and Lenis motion architecture and interaction standards.
  - Detailed layout structures and screen breakdowns for `/`, `/projects`, `/experience`, `/expertise`, and `/:pathMatch(.*)*`.
  - Defined responsive breakpoints, states, and WCAG 2.1 AA accessibility guidelines.
- **feat(data):** Merge experience data and streamline schema
  - Consolidated `experienceData.json` into [src/data/experience.json](file:///home/andyk/Projects/Portfolio/src/data/experience.json) as single source of truth for work experiences, certificates, and achievements.
  - Updated [src/pages/ExperiencePage.vue](file:///home/andyk/Projects/Portfolio/src/pages/ExperiencePage.vue) to import from `experience.json`.
  - Updated [src/pages/HomePage.vue](file:///home/andyk/Projects/Portfolio/src/pages/HomePage.vue) to render enriched work experience entries with logo, period, role, company, and rich descriptions.
  - Deleted redundant `src/data/experienceData.json`.
  - Updated [AGENTS.md](file:///home/andyk/Projects/Portfolio/AGENTS.md) schema documentation and resolved FAQ.
  - **feat(responsive):** Implement responsive layouts and adaptive GSAP animations
  - Refactored [useProjectAnimation.js](file:///home/andyk/Projects/Portfolio/src/composables/animations/homepage/useProjectAnimation.js) using `gsap.matchMedia()` to preserve cinematic horizontal pinning on desktop (`≥ 1024px`) while providing fluid vertical scroll-triggered animations on mobile and tablet (`< 1024px`).
  - Refactored [useExpertiseAnimation.js](file:///home/andyk/Projects/Portfolio/src/composables/animations/homepage/useExpertiseAnimation.js) with `gsap.matchMedia()` for desktop clip-path stack and mobile responsive cards with scroll entrance transitions.
  - Refactored [useContactAnimation.js](file:///home/andyk/Projects/Portfolio/src/composables/animations/homepage/useContactAnimation.js) and [AppFooter.vue](file:///home/andyk/Projects/Portfolio/src/components/AppFooter.vue) to decouple desktop scrub depth from mobile viewport fade transitions, making the email address an accessible clickable mailto link.
  - Updated [AppHeader.vue](file:///home/andyk/Projects/Portfolio/src/components/AppHeader.vue) full-screen navigation modal to adaptively stack menu links and social links on portrait screens with responsive padding and overflow handling.
  - Updated [HomePage.vue](file:///home/andyk/Projects/Portfolio/src/pages/HomePage.vue) templates with fluid typography (`text-4xl sm:text-6xl lg:text-7xl`), mobile-stacked experience timeline, and dedicated mobile expertise cards.
  - Updated [ProjectPage.vue](file:///home/andyk/Projects/Portfolio/src/pages/ProjectPage.vue), [ExperiencePage.vue](file:///home/andyk/Projects/Portfolio/src/pages/ExperiencePage.vue), [ExpertisePage.vue](file:///home/andyk/Projects/Portfolio/src/pages/ExpertisePage.vue), and [NotFoundPage.vue](file:///home/andyk/Projects/Portfolio/src/pages/NotFoundPage.vue) with responsive typography, padding, and flexible grid/column borders.
  - **Files affected:** `src/components/AppHeader.vue`, `src/components/AppFooter.vue`, `src/composables/animations/homepage/useContactAnimation.js`, `src/composables/animations/homepage/useHomePageAnimation.js`, `src/composables/animations/homepage/useProjectAnimation.js`, `src/composables/animations/homepage/useExperienceAnimation.js`, `src/composables/animations/homepage/useExpertiseAnimation.js`, `src/pages/HomePage.vue`, `src/pages/ProjectPage.vue`, `src/pages/ExperiencePage.vue`, `src/pages/ExpertisePage.vue`, `src/pages/NotFoundPage.vue`, `docs/CHANGELOG.md`
- **feat(animation):** Mobile pinned card deck upward slide animation (Option 2)
  - Implemented pinned upward card-stacking animation on mobile (`< 1024px`) in [useProjectAnimation.js](file:///home/andyk/Projects/Portfolio/src/composables/animations/homepage/useProjectAnimation.js): each project card, the end panel, and the experience snapshot slide up from `100%` to `0%` to cover the previous panel while previous panels subtly scale and dim for realistic depth.
  - Updated [HomePage.vue](file:///home/andyk/Projects/Portfolio/src/pages/HomePage.vue) with viewport-height stacked panels and tactile drop shadows for mobile viewports while preserving the desktop pinned horizontal layout (`lg:`).
- **fix(scroll):** Resolve mobile scroll length limitation and Lenis-ScrollTrigger desync
  - Removed restrictive `overflow-hidden` on mobile `#hero-projects-wrapper` and `overflow-x-hidden` on root container, preventing pinned spacer clipping and height containment.
  - Linked `ScrollTrigger.refresh` to `lenis.resize()` in [useHomePageAnimation.js](file:///home/andyk/Projects/Portfolio/src/composables/animations/homepage/useHomePageAnimation.js) so Lenis dynamically recalculates the full document scroll height after pins are established.
  - Added `pinSpacing: true` and `refreshPriority: 2` with generous scroll distance and final-panel hold duration in [useProjectAnimation.js](file:///home/andyk/Projects/Portfolio/src/composables/animations/homepage/useProjectAnimation.js) for a smooth and complete scroll through all cards and subsequent sections.
- **refactor(mobile):** End pinned mobile projects deck on end panel
  - Updated mobile upward slide sequence in [useProjectAnimation.js](file:///home/andyk/Projects/Portfolio/src/composables/animations/homepage/useProjectAnimation.js) to end cleanly on `#projects-end-panel` (`[...cards, endPanel]`), eliminating prolonged virtual scroll effort.
  - Extracted mobile experience snapshot into dedicated `#mobile-experience` section in [HomePage.vue](file:///home/andyk/Projects/Portfolio/src/pages/HomePage.vue) positioned directly in natural document flow before `#experience-timeline`.
  - Maintained desktop cinematic horizontal experience sequence inside `#projects-track` (`hidden lg:block`).
  - **Files affected:** `src/composables/animations/homepage/useProjectAnimation.js`, `src/pages/HomePage.vue`, `docs/CHANGELOG.md`
