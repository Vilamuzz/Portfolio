<script setup>
import { onMounted, onUnmounted } from "vue";
import { Link } from "@lucide/vue";
import Lenis from "lenis";
import projects from "@/data/projects.json";
import expertiseItems from "@/data/expertise.json";
import projectServices from "@/data/projectServices.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeroAnimation } from "@/composables/animations/useHeroAnimation";
import { useContactAnimation } from "@/composables/animations/useContactAnimation";
import { useButtonAnimation } from "@/composables/animations/useButtonAnimation";
import { useExpertiseAnimation } from "@/composables/animations/useExpertiseAnimation";
import { useProjectAnimation } from "@/composables/animations/useProjectAnimation";
import { ArrowUpRight } from "@lucide/vue";
import { ArrowDown } from "@lucide/vue";
import cvPdf from "@/assets/doc/Curriculum Vitae Andy Kasa Sanjaya.pdf";

const { animateHero } = useHeroAnimation();
const { animateContact } = useContactAnimation();
const {
  animateHeroButtonHover,
  animateHeroButtonHoverOut,
  animateProjectCardHover,
  animateProjectCardHoverOut,
  animatePrimaryButtonHover,
  animatePrimaryButtonHoverOut,
} = useButtonAnimation();
const { animateExpertise } = useExpertiseAnimation();
const { animateProjects } = useProjectAnimation();

let lenis = null;
let rafId = null;
let ctx = null;

const initAnimations = () => {
  animateHero();
  animateProjects();
  animateExpertise();
  animateContact();
};

onMounted(() => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  // Initialize GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(ScrollTrigger.update);

  // Wrap all animations in a context for proper cleanup in SPAs
  ctx = gsap.context(() => {
    initAnimations();
  });
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
  if (lenis) lenis.destroy();
  gsap.ticker.remove(ScrollTrigger.update);

  // Revert all GSAP animations and ScrollTriggers created in this context
  if (ctx) ctx.revert();
});
</script>

<template>
  <div class="min-h-screen w-full bg-brand-black font-sans text-white">
    <!-- ─── HERO + PROJECTS WRAPPER ──────────────────────────────────── -->
    <!-- overflow: hidden clips #projects (which sits to the right) until the animation reveals it -->
    <div id="hero-projects-wrapper" class="relative w-screen overflow-hidden">
      <!-- Inner 200vw flex row: [hero | projects] side-by-side in document flow -->
      <div class="flex w-max">
        <!-- ─── HERO ────────────────────────────────────────────────────── -->
        <section
          id="hero"
          class="relative w-screen min-h-screen flex items-center justify-center overflow-hidden px-6 shrink-0"
        >
          <div
            class="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 pt-24"
          >
            <!-- Text -->
            <div class="flex-1 space-y-8">
              <div class="space-y-4">
                <div class="overflow-hidden">
                  <h1
                    class="hero-title text-7xl lg:text-6xl font-extrabold leading-none tracking-tight translate-y-full"
                  >
                    Hi, I'm
                    <span class="group inline-grid grid-cols-1 grid-rows-1 overflow-hidden pb-3">
                      <span
                        class="col-start-1 row-start-1 transition-all duration-500 ease-in-out group-hover:-translate-y-full group-hover:opacity-0"
                        >Andy</span
                      >
                      <span
                        class="col-start-1 row-start-1 translate-y-full opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 text-primary"
                        >Vilamuzz</span
                      >
                    </span>
                  </h1>
                </div>
                <div class="overflow-hidden">
                  <p class="hero-subtitle text-2xl text-primary font-bold translate-y-full">
                    Fullstack Developer
                  </p>
                </div>
              </div>

              <div class="overflow-hidden">
                <p
                  class="hero-description text-white/50 text-lg leading-relaxed max-w-lg translate-y-full"
                >
                  Crafting robust system, high-performance web experiences with a passion for clean
                  code and delightful interactions.
                </p>
              </div>
              <div class="flex flex-wrap gap-4">
                <a
                  id="hero-cv-btn"
                  :href="cvPdf"
                  download="Andy_Kasa_Sanjaya_CV.pdf"
                  class="group relative flex items-center gap-2.5 bg-primary text-brand-black font-bold px-6 py-3 rounded-full cursor-pointer overflow-hidden opacity-0 translate-y-15"
                  @mouseenter="animateHeroButtonHover"
                  @mouseleave="animateHeroButtonHoverOut"
                >
                  <!-- Ripple circle (behind icon) -->
                  <div
                    class="ripple absolute right-8 w-10 h-10 bg-white rounded-full pointer-events-none scale-0"
                  ></div>

                  <!-- Content -->
                  <span class="relative z-10">Download CV</span>
                  <div
                    class="btn-icon-badge relative z-10 bg-white text-black rounded-full p-2 scale-30"
                  >
                    <div class="overflow-hidden">
                      <ArrowDown class="down-arrow size-4 translate-y-full" />
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <!-- Hero Image -->
            <div id="hero-card" class="shrink-0 relative opacity-0 translate-y-15">
              <div class="relative w-auto h-72 lg:w-80 lg:h-96 flex items-end justify-center">
                <img
                  src="@/assets/img/me.png"
                  alt="Andy Vilamuzz"
                  class="relative z-10 w-auto h-full object-cover border-b-4 border-primary pointer-events-none"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- ─── PROJECTS ───────────────────────────────────────────────────── -->
        <!-- Sits naturally to the right of #hero; clipped by the wrapper's overflow: hidden -->
        <section id="projects" class="relative z-20 w-max min-h-screen bg-primary shrink-0">
          <div class="flex w-max">
            <a
              v-for="(project, i) in projects"
              :key="project.title"
              :id="`project-${i}`"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative bg-primary overflow-hidden flex flex-col justify-between w-150 h-screen shrink-0 cursor-pointer"
              @mouseenter="animateProjectCardHover"
              @mouseleave="animateProjectCardHoverOut"
            >
              <div class="w-full flex-1 overflow-hidden relative bg-brand-navy">
                <img
                  :src="project.img"
                  :alt="project.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div :class="[project.bgClass, 'relative p-2 text-center text-brand-black']">
                <div class="flex flex-row justify-between gap-2">
                  <div class="overflow-hidden">
                    <p class="project-meta-item">2026</p>
                  </div>
                  <div class="overflow-hidden">
                    <p class="project-meta-item">showcase</p>
                  </div>
                  <div class="overflow-hidden">
                    <p class="project-meta-item">{{ project.tag }}</p>
                  </div>
                </div>
                <h3 class="text-5xl font-bold flex justify-center overflow-hidden mt-4">
                  <span
                    v-for="(char, charIdx) in project.title"
                    :key="charIdx"
                    class="project-title-char inline-block text-brand-black pb-2"
                  >
                    {{ char === " " ? "\u00A0" : char }}
                  </span>
                </h3>
                <div class="flex items-end justify-between">
                  <p>{{ String(i + 1).padStart(2, "0") }}</p>
                  <div
                    class="project-btn-icon relative size-15 rounded-full border border-brand-black flex items-center justify-center overflow-hidden"
                  >
                    <!-- Ripple circle background -->
                    <div
                      class="ripple absolute w-full h-full bg-brand-black rounded-full pointer-events-none scale-0"
                    ></div>

                    <!-- Dual Arrow Container -->
                    <div
                      class="relative z-10 overflow-hidden size-5 flex items-center justify-center"
                    >
                      <ArrowUpRight class="black-arrow size-5 text-brand-black absolute" />
                      <ArrowUpRight
                        class="white-arrow size-5 text-white absolute -translate-x-full translate-y-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </a>
            <div
              id="projects-end-panel"
              class="w-[calc(100vw-37.5rem)] min-w-125 h-screen shrink-0 flex flex-col justify-between p-12"
            >
              <div>
                <h3 class="text-black font-extrabold text-7xl flex overflow-hidden">
                  <span
                    v-for="(char, charIdx) in 'Projects'"
                    :key="charIdx"
                    class="projects-heading-char inline-block pb-3"
                  >
                    {{ char === " " ? "\u00A0" : char }}
                  </span>
                </h3>
                <ul class="flex flex-col gap-6 mt-12">
                  <li
                    v-for="(service, sIdx) in projectServices"
                    :key="service.title + sIdx"
                    class="flex flex-col space-y-1"
                  >
                    <div class="flex justify-between w-full">
                      <div class="overflow-hidden">
                        <a :href="service.link" class="projects-list-item inline-block font-bold">
                          {{ service.title }}
                        </a>
                      </div>
                      <div class="overflow-hidden">
                        <p class="projects-list-item inline-block font-extrabold text-sm">
                          {{ service.num }}
                        </p>
                      </div>
                    </div>
                    <div class="project-list-bar bg-black h-[0.5px] w-full origin-left"></div>
                  </li>
                </ul>
              </div>
              <div class="flex flex-col mt-12 text-2xl font-bold leading-tight">
                <div class="overflow-hidden">
                  <div class="projects-end-text inline-block">
                    Every Project i've been working on
                  </div>
                </div>
                <div class="overflow-hidden">
                  <div class="projects-end-text inline-block">
                    brings new architectural challenges
                  </div>
                </div>
                <div class="overflow-hidden">
                  <div class="projects-end-text inline-block">
                    and sharpens how I solve problems.
                  </div>
                </div>
              </div>
              <RouterLink
                to="/projects"
                class="primary-button group relative flex justify-between items-center gap-2.5 text-brand-black font-bold px-8 py-3 border rounded-full cursor-pointer overflow-hidden text-sm w-1/2"
                @mouseenter="animatePrimaryButtonHover"
                @mouseleave="animatePrimaryButtonHoverOut"
              >
                <div
                  class="fill absolute left-0 w-full h-full bg-black translate-y-full pointer-events-none"
                ></div>

                <!-- Content -->
                <div class="overflow-hidden">
                  <span class="text inline-block relative z-10">SEE MORE PROJECTS</span>
                </div>
                <div
                  class="btn-icon-badge relative z-10 bg-black text-black rounded-full p-2 scale-30"
                >
                  <div class="overflow-hidden">
                    <ArrowUpRight class="arrow size-4 translate-y-full -translate-x-full" />
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- ─── EXPERTISE ──────────────────────────────────────────────────── -->
    <section id="expertise" class="relative w-screen h-screen overflow-hidden bg-brand-black">
      <div id="head" class="absolute inset-0 w-full h-full pt-32 px-32 z-30 pointer-events-none">
        <h1 class="text-5xl font-bold flex overflow-hidden">
          <span
            v-for="(char, charIdx) in 'Expertise'"
            :key="charIdx"
            class="expertise-heading-char inline-block pb-2"
          >
            {{ char === " " ? "\u00A0" : char }}
          </span>
        </h1>
      </div>
      <div id="items" class="absolute inset-0 w-full h-full z-10">
        <div
          v-for="(item, index) in expertiseItems"
          :key="item.title"
          class="item absolute inset-0 w-full h-full"
          :style="{ zIndex: (index + 1) * 10 }"
        >
          <div class="inner absolute inset-0 w-full h-full">
            <div class="absolute inset-0 w-full h-full">
              <div :class="['background absolute inset-0 w-full h-full', item.bgClass]"></div>
              <div
                class="content absolute inset-0 w-full h-full flex flex-col justify-end px-32 pb-[15%] z-10"
              >
                <div class="overflow-hidden mb-6">
                  <h3 class="expertise-item-title text-3xl font-bold inline-block">
                    {{ item.title }}
                  </h3>
                </div>
                <div class="flex flex-wrap gap-x-4 gap-y-2 max-w-1/3 mb-6 text-sm uppercase">
                  <div v-for="skill in item.skills" :key="skill" class="overflow-hidden">
                    <span class="expertise-item-skill inline-block">/ {{ skill }}</span>
                  </div>
                </div>
                <RouterLink
                  class="primary-button group relative flex justify-between items-center gap-2.5 bg-primary text-brand-black font-bold px-8 py-3 rounded-full cursor-pointer overflow-hidden text-sm w-1/4"
                  to="expertise"
                  @mouseenter="animatePrimaryButtonHover"
                  @mouseleave="animatePrimaryButtonHoverOut"
                >
                  <div
                    class="fill absolute left-0 w-full h-full bg-black translate-y-full pointer-events-none"
                  ></div>

                  <!-- Content -->
                  <div class="overflow-hidden">
                    <span class="text inline-block relative z-10">SEE EXPERTISE</span>
                  </div>
                  <div
                    class="btn-icon-badge relative z-10 bg-black text-black rounded-full p-2 scale-30"
                  >
                    <div class="overflow-hidden">
                      <ArrowUpRight class="arrow size-4 translate-y-full -translate-x-full" />
                    </div>
                  </div>
                </RouterLink>
              </div>
              <div
                class="image-container absolute right-1/5 top-1/2 -translate-y-1/2 z-20 pointer-events-none w-fit h-fit"
              >
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-105 h-70 object-cover shadow-2xl pointer-events-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CONTACT ────────────────────────────────────────────────────── -->
    <footer id="contact" class="pt-32 py-4 px-6 bg-brand-navy/30 overflow-hidden">
      <div class="max-w-4xl mx-auto text-center translate-y-7.5">
        <p id="contact-subtitle" class="text-white/50 text-lg leading-relaxed max-w-xl mx-auto">
          Let's create something
        </p>
        <h1 id="contact-heading" class="text-4xl lg:text-6xl font-extrabold leading-tight mb-32">
          vilamuzz@gmail.com
        </h1>
      </div>

      <div id="contact-socials" class="flex flex-row justify-center gap-4 mt-auto translate-y-7.5">
        <a
          href="https://www.linkedin.com/in/andy-kasa"
          class="text-white hover:text-primary transition-colors"
        >
          <Link class="size-6" />
        </a>
        <a
          href="https://github.com/Vilamuzz"
          class="text-white hover:text-primary transition-colors"
        >
          <svg
            class="size-6 fill-current"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>GitHub</title>
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
        </a>
        <a
          href="https://instagram.com/vilamuzz"
          class="text-white hover:text-primary transition-colors"
        >
          <svg
            class="size-6 fill-current"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Instagram</title>
            <path
              d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
            />
          </svg>
        </a>
      </div>
    </footer>
  </div>
</template>
