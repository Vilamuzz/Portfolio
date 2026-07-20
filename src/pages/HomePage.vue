<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  createIcons,
  Palette,
  Zap,
  Accessibility,
  Smartphone,
  Mail,
  CodeXml,
  Link,
  ArrowRight,
  ExternalLink,
} from "lucide";
import Lenis from "lenis";
import skills from "@/data/skills.json";
import projects from "@/data/projects.json";
import marqueeItems from "@/data/techStack.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Nav scroll state
const scrolled = ref(false);
const activeSection = ref("hero");
let lenis = null;
let rafId = null;

const animateOnScroll = () => {
  // Hero fade-in on load
  gsap.fromTo(
    "#hero > div",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
  );

  // About section on scroll
  gsap.fromTo(
    "#about .space-y-6, #about .grid",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    },
  );

  // Skills section
  gsap.fromTo(
    "#skills > div > div",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      scrollTrigger: {
        trigger: "#skills",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    },
  );

  // Projects cards
  gsap.fromTo(
    "#projects article",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#projects",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    },
  );

  // Contact section
  gsap.fromTo(
    "#contact > div > div",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    },
  );
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 40;

  const sections = ["hero", "about", "skills", "projects", "contact"];
  for (const id of sections.toReversed()) {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) {
      activeSection.value = id;
      break;
    }
  }
};

onMounted(() => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  lenis.on("scroll", handleScroll);
  handleScroll();

  // Initialize GSAP ScrollTrigger with Lenis proxy
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.scrollerProxy("body", {
    scrollTop(value) {
      return arguments.length ? lenis.scrollTo(value) : lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(ScrollTrigger.update);

  // Run animations
  animateOnScroll();

  createIcons({
    icons: {
      Palette,
      Zap,
      Accessibility,
      Smartphone,
      Mail,
      CodeXml,
      Link,
      ArrowRight,
      ExternalLink,
    },
  });
});

onUnmounted(() => {
  if (lenis) {
    lenis.destroy();
  }
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
});

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    lenis?.scrollTo(el, {
      offset: -80, // Offset navbar height
      duration: 1.2,
    });
  }
};
</script>

<template>
  <div class="min-h-screen w-full bg-brand-black font-sans text-white overflow-x-hidden">
    <!-- ─── NAVIGATION ──────────────────────────────────────────────── -->
    <nav
      id="navbar"
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      :class="scrolled ? 'bg-brand-black/90 backdrop-blur-md py-3' : 'py-6'"
    >
      <div class="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <!-- Logo -->
        <button
          id="nav-logo"
          class="text-primary font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity cursor-pointer"
          @click="scrollTo('hero')"
        >
          V
        </button>

        <!-- Links -->
        <ul class="hidden md:flex items-center gap-8">
          <li v-for="link in ['about', 'skills', 'projects', 'contact']" :key="link">
            <button
              :id="`nav-${link}`"
              class="capitalize text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer"
              :class="activeSection === link ? 'text-primary' : 'text-white/50 hover:text-white'"
              @click="scrollTo(link)"
            >
              {{ link }}
            </button>
          </li>
        </ul>

        <!-- CTA -->
        <a
          id="nav-cta"
          href="#contact"
          class="hidden md:inline-flex items-center gap-2 bg-primary text-brand-black text-sm font-bold px-5 py-2.5 rounded-full hover:bg-secondary transition-colors duration-200"
          @click.prevent="scrollTo('contact')"
        >
          Hire Me
          <i data-lucide="arrow-right" class="size-4 stroke-[2.5]"></i>
        </a>
      </div>
    </nav>

    <!-- ─── HERO ────────────────────────────────────────────────────── -->
    <section
      id="hero"
      class="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      <!-- Background decorations -->
      <div class="absolute inset-0 pointer-events-none">
        <!-- Radial glow -->
        <div
          class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[120px]"
        ></div>
        <!-- Grid lines -->
        <div
          class="absolute inset-0 opacity-5"
          style="
            background-image:
              linear-gradient(rgba(255, 214, 10, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 214, 10, 0.3) 1px, transparent 1px);
            background-size: 60px 60px;
          "
        ></div>
      </div>

      <div
        class="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 pt-24"
      >
        <!-- Text -->
        <div class="flex-1 space-y-8">
          <div>
            <p class="text-white/40 text-lg font-medium mb-2 tracking-wide">Hi, I'm</p>
            <h1 class="text-7xl lg:text-8xl font-extrabold leading-none tracking-tight">
              Vila<span class="text-primary">muzz</span>
            </h1>
          </div>

          <div class="flex items-center gap-3">
            <div class="h-px w-10 bg-primary"></div>
            <p class="text-xl text-white/60 font-medium">Fullstack Developer</p>
          </div>

          <p class="text-white/50 text-lg leading-relaxed max-w-lg">
            Crafting pixel-perfect, high-performance web experiences with a passion for clean code
            and delightful interactions.
          </p>

          <div class="flex flex-wrap gap-4">
            <button
              id="hero-projects-btn"
              class="group flex items-center gap-2.5 bg-primary text-brand-black font-bold px-8 py-4 rounded-full hover:bg-secondary transition-all duration-200 hover:scale-105 cursor-pointer"
              @click="scrollTo('projects')"
            >
              View Projects
              <i
                data-lucide="arrow-right"
                class="size-4 stroke-[2.5] group-hover:translate-x-1 transition-transform"
              ></i>
            </button>
            <button
              id="hero-about-btn"
              class="flex items-center gap-2.5 border border-white/15 text-white/70 font-semibold px-8 py-4 rounded-full hover:border-primary/50 hover:text-white transition-all duration-200 cursor-pointer"
              @click="scrollTo('about')"
            >
              About Me
            </button>
          </div>
        </div>

        <!-- Hero card -->
        <div class="flex-shrink-0 relative">
          <!-- Glowing border card -->
          <div class="relative w-72 h-72 lg:w-80 lg:h-80">
            <!-- Outer glow ring -->
            <div
              class="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/10 blur-2xl animate-pulse"
            ></div>
            <!-- Card -->
            <div
              class="relative w-full h-full bg-brand-navy border border-white/10 rounded-3xl p-8 flex flex-col justify-between overflow-hidden"
            >
              <!-- Corner accent -->
              <div class="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-3xl"></div>

              <div class="space-y-1">
                <p class="text-white/40 text-xs font-semibold tracking-widest uppercase">Role</p>
                <p class="text-white font-bold text-lg">Fullstack Dev</p>
              </div>

              <!-- Big yellow initial -->
              <div class="text-center">
                <span class="text-9xl font-extrabold text-primary leading-none select-none">V</span>
              </div>

              <div class="flex justify-between items-end">
                <div>
                  <p class="text-white/40 text-xs font-semibold tracking-widest uppercase">
                    Experience
                  </p>
                  <p class="text-white font-bold">3+ Years</p>
                </div>
                <div class="text-right">
                  <p class="text-white/40 text-xs font-semibold tracking-widest uppercase">
                    Projects
                  </p>
                  <p class="text-white font-bold">20+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll hint -->
      <div
        class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
      >
        <span class="text-white/30 text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div class="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"></div>
      </div>
    </section>

    <!-- ─── MARQUEE ──────────────────────────────────────────────────── -->
    <div class="relative border-y border-white/5 bg-brand-navy/50 py-5 overflow-hidden">
      <div class="flex gap-12 animate-[marquee_25s_linear_infinite] whitespace-nowrap w-max">
        <span
          v-for="(item, i) in marqueeItems"
          :key="i"
          class="text-sm font-semibold tracking-widest uppercase flex items-center gap-3"
          :class="i % 4 === 0 ? 'text-primary' : 'text-white/25'"
        >
          {{ item }}
          <span class="text-white/10">◆</span>
        </span>
      </div>
    </div>

    <!-- ─── ABOUT ─────────────────────────────────────────────────────── -->
    <section id="about" class="py-32 px-6">
      <div class="max-w-6xl mx-auto">
        <!-- Section label -->
        <div class="flex items-center gap-4 mb-16">
          <span class="text-primary font-bold text-sm tracking-widest uppercase">01 — About</span>
          <div class="h-px flex-1 bg-white/5"></div>
        </div>

        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Left — text -->
          <div class="space-y-6">
            <h2 class="text-5xl font-extrabold leading-tight">
              Turning ideas into<br />
              <span class="text-primary">living system</span>
            </h2>
            <p class="text-white/50 text-lg leading-relaxed">
              I'm a fullstack developer based in Indonesia, specialising in building fast,
              accessible and visually striking web applications. I care deeply about the
              intersection of design and engineering.
            </p>
            <p class="text-white/50 text-lg leading-relaxed">
              Outside of code I enjoy back-end exploration.
            </p>

            <!-- Stats row -->
            <div class="grid grid-cols-3 gap-6 pt-4">
              <div
                v-for="stat in [
                  ['3+', 'Years Exp.'],
                  ['20+', 'Projects'],
                  ['10+', 'Clients'],
                ]"
                :key="stat[0]"
                class="space-y-1"
              >
                <p class="text-4xl font-extrabold text-primary">{{ stat[0] }}</p>
                <p class="text-white/40 text-sm font-medium">{{ stat[1] }}</p>
              </div>
            </div>
          </div>

          <!-- Right — card grid -->
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="card in [
                {
                  icon: 'palette',
                  title: 'UI Design',
                  desc: 'Clean, purposeful interfaces that delight users.',
                },
                {
                  icon: 'zap',
                  title: 'Performance',
                  desc: 'Optimised bundles, lazy loading & fast paint times.',
                },
                {
                  icon: 'accessibility',
                  title: 'Accessibility',
                  desc: 'WCAG-compliant, keyboard-navigable experiences.',
                },
                {
                  icon: 'smartphone',
                  title: 'Responsive',
                  desc: 'Flawless across every screen size and device.',
                },
              ]"
              :key="card.title"
              class="group bg-brand-navy border border-white/5 rounded-2xl p-6 hover:border-primary/30 hover:bg-brand-navy/80 transition-all duration-300 cursor-default"
            >
              <div class="mb-3 text-primary">
                <i :data-lucide="card.icon" class="size-8"></i>
              </div>
              <h3 class="text-white font-bold mb-1.5 group-hover:text-primary transition-colors">
                {{ card.title }}
              </h3>
              <p class="text-white/40 text-sm leading-relaxed">{{ card.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── SKILLS ─────────────────────────────────────────────────────── -->
    <section id="skills" class="py-32 px-6 bg-brand-navy/30">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center gap-4 mb-16">
          <span class="text-primary font-bold text-sm tracking-widest uppercase">02 — Skills</span>
          <div class="h-px flex-1 bg-white/5"></div>
        </div>

        <div class="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 class="text-5xl font-extrabold leading-tight mb-6">
              My technical<br /><span class="text-primary">toolbox</span>
            </h2>
            <p class="text-white/50 text-lg leading-relaxed max-w-md">
              A curated set of technologies I use to build production-grade front-end and back-end
              applications. Always learning, always improving.
            </p>
          </div>

          <!-- Skill bars -->
          <div class="space-y-6">
            <div v-for="skill in skills" :key="skill.name" class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-white font-semibold text-sm">{{ skill.name }}</span>
                <span class="text-primary font-bold text-sm">{{ skill.level }}%</span>
              </div>
              <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tech tags -->
        <div class="mt-16 flex flex-wrap gap-3">
          <span
            v-for="tag in [
              'HTML5',
              'CSS3',
              'JavaScript',
              'TypeScript',
              'Vue 3',
              'React',
              'Vite',
              'Tailwind CSS',
              'Pinia',
              'Vue Router',
              'Git',
              'Figma',
              'REST API',
              'GraphQL',
              'Vitest',
            ]"
            :key="tag"
            class="border border-white/10 text-white/50 text-xs font-semibold tracking-wide px-4 py-2 rounded-full hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-default"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </section>

    <!-- ─── PROJECTS ───────────────────────────────────────────────────── -->
    <section id="projects" class="py-32 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center gap-4 mb-16">
          <span class="text-primary font-bold text-sm tracking-widest uppercase"
            >03 — Projects</span
          >
          <div class="h-px flex-1 bg-white/5"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <article
            v-for="(project, i) in projects"
            :key="project.title"
            :id="`project-${i}`"
            class="group relative bg-brand-navy border border-white/5 rounded-2xl p-8 hover:border-primary/25 transition-all duration-300 overflow-hidden flex flex-col justify-between gap-6"
          >
            <!-- Hover glow -->
            <div
              class="absolute -top-16 -right-16 size-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500"
            ></div>

            <div class="relative space-y-4">
              <div class="flex items-center justify-between">
                <span
                  class="text-primary text-xs font-bold tracking-widest uppercase border border-primary/30 bg-primary/8 rounded-full px-3 py-1"
                >
                  {{ project.tag }}
                </span>
                <a
                  :href="project.link"
                  class="size-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-primary/50 hover:text-primary transition-all duration-200"
                >
                  <i data-lucide="external-link" class="size-3.5"></i>
                </a>
              </div>
              <h3
                class="text-2xl font-bold group-hover:text-primary transition-colors duration-200"
              >
                {{ project.title }}
              </h3>
              <p class="text-white/50 leading-relaxed">{{ project.desc }}</p>
            </div>

            <div class="relative flex flex-wrap gap-2">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="bg-white/5 text-white/50 text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                {{ tech }}
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ─── CONTACT ────────────────────────────────────────────────────── -->
    <section id="contact" class="py-32 px-6 bg-brand-navy/30">
      <div class="max-w-4xl mx-auto text-center">
        <div class="flex items-center justify-center gap-4 mb-16">
          <div class="h-px w-16 bg-white/5"></div>
          <span class="text-primary font-bold text-sm tracking-widest uppercase">04 — Contact</span>
          <div class="h-px w-16 bg-white/5"></div>
        </div>

        <h2 class="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
          Let's build something<br /><span class="text-primary">amazing</span>
        </h2>
        <p class="text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-12">
          Have a project in mind or just want to say hello? My inbox is always open.
        </p>

        <!-- Contact card -->
        <div class="bg-brand-navy border border-white/5 rounded-3xl p-10 space-y-8">
          <div class="grid md:grid-cols-3 gap-6">
            <a
              v-for="item in [
                {
                  label: 'Email',
                  value: 'hello@vilamuzz.dev',
                  icon: 'mail',
                  href: 'mailto:hello@vilamuzz.dev',
                },
                {
                  label: 'GitHub',
                  value: '@vilamuzz',
                  icon: 'codeXml',
                  href: 'https://github.com',
                },
                {
                  label: 'LinkedIn',
                  value: 'Vilamuzz',
                  icon: 'link',
                  href: 'https://linkedin.com',
                },
              ]"
              :key="item.label"
              :href="item.href"
              class="group flex flex-col items-center gap-3 border border-white/5 rounded-2xl p-6 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
            >
              <div class="text-primary mb-1">
                <i :data-lucide="item.icon" class="size-8"></i>
              </div>
              <div>
                <p class="text-white/30 text-xs font-semibold tracking-widest uppercase mb-1">
                  {{ item.label }}
                </p>
                <p
                  class="text-white font-semibold group-hover:text-primary transition-colors text-sm"
                >
                  {{ item.value }}
                </p>
              </div>
            </a>
          </div>

          <!-- Email CTA -->
          <a
            id="contact-email-btn"
            href="mailto:hello@vilamuzz.dev"
            class="inline-flex items-center gap-3 bg-primary text-brand-black font-bold text-lg px-10 py-5 rounded-full hover:bg-secondary transition-all duration-200 hover:scale-105"
          >
            Send a Message
            <i data-lucide="arrow-right" class="size-5 stroke-[2.5]"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- ─── FOOTER ─────────────────────────────────────────────────────── -->
    <footer class="border-t border-white/5 py-8 px-6">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-end gap-4">
        <div class="flex items-center gap-6">
          <button
            v-for="link in ['about', 'skills', 'projects', 'contact']"
            :key="link"
            class="text-white/20 text-sm capitalize hover:text-primary transition-colors cursor-pointer"
            @click="scrollTo(link)"
          >
            {{ link }}
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>
