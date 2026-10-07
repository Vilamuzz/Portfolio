# PRD — Vilamuzz Portfolio

> This document defines what the portfolio _does_, who uses it, and why.
> Complements agents.md (technical rules) and trd.md (technical architecture).

---

## 1. Product Overview

**Name:** Vilamuzz Portfolio  
**Type:** Static showcase website (SPA)  
**Purpose:** Display backend engineering projects, work experience, and technical expertise to recruiters and potential collaborators.

**One-liner:** A fast, animated portfolio site showcasing projects, internship experience, and technical skills.

---

## 2. User Personas

### Persona 1: Recruiter / Hiring Manager

- **Goal:** Quickly assess candidate's backend skills, project complexity, and experience level.
- **Needs:**
    - See featured projects with links to GitHub
    - Understand tech stack (Go, Laravel, PostgreSQL, Redis, etc.)
    - View work experience timeline
    - Clear call-to-action (contact, LinkedIn, GitHub)
- **Frustrations:** Broken links, slow page loads, unclear project descriptions

### Persona 2: Vilamuzz (Portfolio Owner)

- **Goal:** Keep portfolio up-to-date with new projects and skills.
- **Needs:**
    - Edit project/experience data without touching code
    - Easy project addition workflow
    - Quick deployment after updates
- **Frustrations:** Complex CMS, need to redeploy manually

### Persona 3: Collaborator / Developer

- **Goal:** Understand tech stack and architecture, potentially fork/contribute.
- **Needs:**
    - Clear GitHub link on each project
    - Documented tech stack
    - Easy-to-read code structure
- **Frustrations:** Vague descriptions, no repository links

---

## 3. Core Features (MVP)

### 3.1 Homepage (`/`)

**What it shows:**

- Hero section: Name, title, short intro
- Featured projects (2-3 pinned projects)
- Experience intro: Latest role/company
- Expertise intro: Top 3-5 technologies
- Social links & call-to-action (GitHub, LinkedIn, Email)

**Interactions:**

- Smooth scroll animations (Lenis)
- Hover effects on project cards (GSAP)
- Click "View All Projects" → `/projects`
- Click "View Experience" → `/experience`
- Click "View Skills" → `/expertise`

**Data source:** `projects.json` (featured: true), `experience.json` (latest entry), `expertise.json` (top skills)

---

### 3.2 Projects Page (`/projects`)

**What it shows:**

- Grid/list of all projects (from `projects.json`)
- Each project card displays:
    - Title
    - Year & role
    - Project category (tag)
    - Tech stack (services)
    - Cover image
    - GitHub link
    - Description (1-2 lines)

**Interactions:**

- Filter by technology (e.g., click "Go" → show only Go projects)
- Filter by year or status (optional, future enhancement)
- Click card → open GitHub link in new tab
- Smooth animations on page load (GSAP timeline)

**Data source:** `projects.json`, services.json` (tech tags)

---

### 3.3 Experience Page (`/experience`)

**What it shows:**

- Timeline of work experience
- Each entry displays:
    - Company name
    - Job title
    - Duration (start–end date)
    - 2-3 key accomplishments
    - Technologies used

**Interactions:**

- Timeline animates on scroll
- Hover on entry → highlight and expand
- Smooth entrance animations for each entry

**Data source:** `experience.json` (merged from experienceData.json)

---

### 3.4 Expertise Page (`/expertise`)

**What it shows:**

- Skills grouped by category:
    - Languages (Go, JavaScript, PHP, etc.)
    - Frameworks (Vue 3, Laravel, Gin, etc.)
    - Databases (PostgreSQL, Redis, etc.)
    - Tools (Git, Docker, Linux, GitHub Actions, etc.)
- Each skill shows:
    - Name
    - Proficiency level (Beginner, Intermediate, Advanced)
    - Years of experience

**Interactions:**

- Smooth scroll animations as user reads down
- Hover effect on skill badges
- Responsive grid layout

**Data source:** `expertise.json`

---

### 3.5 Navigation & Layout

**Shared Components:**

- **AppHeader.vue**
    - Logo / name (links to `/`)
    - Navigation links: Projects, Expertise, Experience
    - Responsive mobile menu (optional, future)
    - Dark mode indicator (scheme-dark applied globally)

- **AppFooter.vue**
    - Social links (GitHub, LinkedIn, Email)
    - Copyright notice
    - Optional: "Last updated" date

**Page Structure:**

- Each page imports and renders AppHeader + AppFooter
- No global layout wrapper (flat routing)
- NotFoundPage: custom 404 with back-to-home link

---

### 3.6 404 Not Found (`/:pathMatch(.*)*`)

**What it shows:**

- "Page not found" message
- Button to return home
- Minimal styling (no header/footer)

---

## 4. Non-Functional Requirements

### Performance

- **Target:** Lighthouse score ≥ 90
- **Page load:** < 2 seconds (first contentful paint)
- **Animation frame rate:** 60 fps (no jank on scroll/hover)
- **Image optimization:** Compressed before commit

### Accessibility

- WCAG 2.1 Level AA compliance (where applicable)
- Alt text on images
- Semantic HTML (headings, lists, links)
- Keyboard navigation (Tab through links)

### Responsiveness

- Mobile-first design
- Breakpoints: Mobile (< 640px), Tablet (640–1024px), Desktop (> 1024px)
- No horizontal scroll on any viewport
- Touch-friendly CTAs (tap targets ≥ 44px)

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Security

- No sensitive data in code or JSON files
- External links use `https://` and `rel="noopener noreferrer"`
- No user input (read-only site)
- Secrets stored in GitHub repo settings (FTP credentials)

---

## 5. Success Metrics

| Metric                | Target              | Measurement                                             |
| --------------------- | ------------------- | ------------------------------------------------------- |
| Page Load Time        | < 2s                | Chrome DevTools, Lighthouse                             |
| Lighthouse Score      | ≥ 90                | pnpm run build → audit                                  |
| Mobile Responsiveness | 100%                | Manual testing + Playwright visual regression           |
| Animation Smoothness  | 60 fps              | Chrome DevTools Performance tab                         |
| Code Linting          | 0 errors            | `pnpm run lint` must pass                               |
| GitHub Deployment     | 0 failures          | CI/CD status on master push                             |
| Project Visibility    | All projects appear | Manual QA: load `/projects`, verify all projects render |

---

## 6. User Stories

### US-1: Recruiter Discovers Projects

**As a** recruiter visiting the portfolio  
**I want to** see featured projects on the homepage  
**So that** I can quickly assess the candidate's backend experience

**Acceptance Criteria:**

- Homepage displays 2–3 featured projects (featured: true in JSON)
- Each project shows title, year, role, tech stack, and image
- Click project → open GitHub link in new tab
- Page loads in < 2 seconds

---

### US-2: View Full Project List

**As a** recruiter wanting deeper insight  
**I want to** see all projects on a dedicated page  
**So that** I can understand the breadth of backend experience

**Acceptance Criteria:**

- `/projects` page displays grid of all projects from `projects.json`
- Can filter by technology (e.g., "Go", "Laravel")
- Each project is clickable → GitHub link
- Animations don't block interaction

---

### US-3: Understand Experience Timeline

**As a** recruiter evaluating employment history  
**I want to** see a clear timeline of work experience  
**So that** I can verify internship duration and progression

**Acceptance Criteria:**

- `/experience` page shows timeline of all work entries
- Each entry displays company, role, dates, key accomplishments
- Entries are sortable by date (latest first)
- Animations enhance but don't distract

---

### US-4: Review Technical Skills

**As a** recruiter assessing technical fit  
**I want to** see categorized skills and proficiency levels  
**So that** I can determine if the candidate matches our tech stack

**Acceptance Criteria:**

- `/expertise` page groups skills by category (languages, frameworks, databases, tools)
- Each skill shows proficiency (Beginner/Intermediate/Advanced) and years
- Page is scannable and well-organized
- Mobile responsive

---

### US-5: Easy Project Updates

**As a** portfolio owner  
**I want to** add/edit projects without touching code  
**So that** I can keep the portfolio fresh with new work

**Acceptance Criteria:**

- Projects are stored in `projects.json` (data, not hardcoded)
- Adding a project requires only editing JSON
- New projects appear immediately after `pnpm run build`
- Schema is documented in agents.md

---

### US-6: Quick Deployment

**As a** portfolio owner  
**I want to** push changes to GitHub and see them live  
**So that** I don't need to manually FTP files

**Acceptance Criteria:**

- Push to `master` branch triggers CI/CD
- GitHub Actions runs lint → build → FTP deploy
- Deployment completes in < 5 minutes
- Failed builds are caught before deploy

---

## 7. Out of Scope (V1)

These features are **not** included in MVP:

- ❌ CMS or admin dashboard (owner edits JSON directly)
- ❌ User authentication or login
- ❌ Contact form (no backend to handle submissions)
- ❌ Blog or articles section
- ❌ Dark/light theme toggle (forced to dark mode)
- ❌ Multi-language support (English only)
- ❌ Comments or feedback system
- ❌ Analytics tracking (Google Analytics, etc.)
- ❌ Newsletter signup
- ❌ File downloads (CV, resume)

---

## 8. Roadmap (Future Releases)

### Phase 2 (Post-MVP)

- Add contact form (Formspree or Netlify Forms backend)
- Mobile hamburger menu (responsive nav)
- Project detail pages (click project → full description, screenshots, results)
- Skill search/filter on expertise page

### Phase 3 (Medium-term)

- Blog/articles section (markdown-based or CMS)
- Dark/light theme toggle
- Analytics dashboard (see visitor traffic, popular projects)
- SEO optimization (meta tags, structured data)

### Phase 4 (Long-term)

- Admin dashboard for project/experience edits
- Migrate to headless CMS (Strapi, Contentful, Sanity)
- API integration (if adding backend)
- PDF resume generation

---

## 9. Content Strategy

### Homepage Content

- **Hero:** "Hi, I'm Vilamuzz" + "Backend Engineer | Go | Laravel" + CTA to projects
- **Featured Projects:** 2–3 latest or most impressive projects
- **Experience Snapshot:** Latest role with company, duration, and tech
- **Skills Intro:** Top 5 technologies with proficiency badges
- **Footer:** GitHub, LinkedIn, Email links

### Project Descriptions

Keep concise (1–2 sentences). Example:

> "Handicraft marketplace built with Go + PostgreSQL. Implemented hexagonal architecture, optimized queries (40% faster), and deployed to production."

### Call-to-Actions

- Homepage: "View All Projects" → `/projects`
- Each project: GitHub link (external)
- Header: Navigation links → pages
- Footer: Social links (external)

---

## 10. Design & Brand

### Visual Style

- **Dark mode:** Tailwind dark scheme applied globally
- **Color palette:** Primary, secondary, accent (define in Tailwind config or Figma)
- **Typography:** Sans-serif (define in Tailwind or CSS)
- **Icons:** Lucide Vue (monochrome, 24px default)

### Animations

- **Page entrance:** Smooth fade-in, slide-up (GSAP timeline)
- **Hover states:** Subtle scale, shadow (button, card, link)
- **Smooth scroll:** Lenis.js (global effect)
- **Text reveal:** Stagger animation on hero section

---

## 11. Analytics & Feedback

### Metrics to Track (Future)

- Most visited pages (homepage, projects, experience)
- Click-through rates (external links)
- Time spent per page
- Mobile vs. desktop traffic
- Referral sources (Google, LinkedIn, direct)

### Feedback Collection (Future)

- GitHub Issues for bug reports
- Email contact form (once implemented)
- Social media mentions

---

## 12. Glossary

| Term               | Definition                                                            |
| ------------------ | --------------------------------------------------------------------- |
| Featured Project   | Project with `featured: true` in `projects.json`; appears on homepage |
| Service/Technology | Skill or tool used in a project (Go, PostgreSQL, etc.)                |
| Proficiency Level  | Beginner, Intermediate, or Advanced rating for a skill                |
| SPA                | Single Page Application (Vue Router handles all navigation)           |
| Lenis              | Smooth scroll library (global effect across all pages)                |
| GSAP               | Animation library (handles complex timelines and tweens)              |

---

## 13. FAQs

**Q: Why no contact form?**  
A: Infinity Free doesn't support backend processing. Can add Formspree in Phase 2.

**Q: Why no dark/light toggle?**  
A: Reduces complexity. Dark mode is the only supported theme in V1.

**Q: Can visitors download my CV?**  
A: Not in V1. Link to external CV (Google Drive, PDF host) in footer if needed.

**Q: How do I add a new project?**  
A: Edit `src/data/projects.json`, add entry, run `pnpm run build`, push to master.

**Q: How long until it appears live?**  
A: CI/CD takes ~2–5 minutes. GitHub Actions workflow runs on push → deploy to Infinity Free.

---

## 14. Acceptance Criteria (MVP Completion)

- [ ] All 5 pages render without errors (`/`, `/projects`, `/expertise`, `/experience`, `/404`)
- [ ] Navigation links work (RouterLink, no broken paths)
- [ ] All projects, experience, expertise data loads from JSON files
- [ ] Homepage features 2–3 projects (featured: true)
- [ ] Projects page displays all projects in grid/list
- [ ] Experience page shows timeline with all entries
- [ ] Expertise page groups skills by category
- [ ] Animations run smoothly (60 fps, no jank)
- [ ] Linting passes: `pnpm run lint` → 0 errors
- [ ] Build succeeds: `pnpm run build` → dist/ folder
- [ ] Lighthouse score ≥ 90 (performance, accessibility, best practices)
- [ ] Mobile responsive (tested on < 640px, > 1024px)
- [ ] CI/CD deploys to Infinity Free without errors
- [ ] All external links open in new tab with `rel="noopener noreferrer"`

---

**Last Updated:** 2025-10-07  
**Owner:** Vilamuzz  
**Status:** MVP (Active)
