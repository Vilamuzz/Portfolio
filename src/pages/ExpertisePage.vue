<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import expertiseItems from "@/data/expertise.json";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useExpertisePageAnimation } from "@/composables/animations/useExpertisePageAnimation";
import { useButtonAnimation } from "@/composables/animations/useButtonAnimation";
import { Cpu, Zap, ShieldCheck, ArrowUpRight } from "@lucide/vue";

const containerRef = ref(null);

const { animatePrimaryButtonHover, animatePrimaryButtonHoverOut } = useButtonAnimation();

useExpertisePageAnimation(containerRef);

// Row 1 Skills: Development Domains
const developmentSkills = [
  "Front-end Development",
  "Back-end Development",
  "Fullstack Development",
  "DevOps & Cloud Infrastructure",
  "Performance Optimization",
];

// Row 2 Skills: Technologies I Use
const technologies = [
  "Vue 3",
  "React",
  "Node.js",
  "Go / Golang",
  "PostgreSQL",
  "Docker",
  "Tailwind CSS",
  "GSAP",
  "Redis",
  "Git & GitHub",
  "Cloudflare",
  "Vite",
];
</script>

<template>
  <div
    ref="containerRef"
    class="min-h-screen w-full bg-primary text-black font-sans selection:bg-brand-black selection:text-white"
  >
    <!-- Navigation Header -->
    <AppHeader />

    <!-- Main Container -->
    <main class="pt-32 pb-20 px-6 sm:px-10 max-w-7xl mx-auto space-y-28 lg:space-y-36">
      <!-- Page Hero Header -->
      <div class="space-y-4">
        <h1 class="text-5xl sm:text-7xl font-extrabold tracking-tight text-black leading-none">
          My Expertise & Craft
        </h1>
        <p class="text-xl sm:text-2xl text-black/60 font-medium max-w-3xl leading-relaxed">
          Bridging creative web experiences with resilient engineering, performance optimization,
          and scalable backend architecture.
        </p>
      </div>

      <!-- ─── PITCH ────────────────── -->
      <section id="speech-pitch-section" class="relative">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <!-- Pitch Block 1 -->
          <div
            class="pitch-card group relative p-8 flex flex-col justify-between hover:-translate-y-1"
          >
            <div class="space-y-4">
              <div
                class="size-12 flex items-center justify-center font-extrabold text-xl border border-primary/20"
              >
                01
              </div>
              <h3 class="text-2xl font-bold text-black">Engineering with Purpose</h3>
              <p class="text-black/70 leading-relaxed text-sm lg:text-base">
                "I believe software shouldn't just run—it should captivate and perform effortlessly.
                My goal is to build web applications where rapid reactivity, elegant design, and
                robust backend stability converge seamlessly."
              </p>
            </div>
            <div
              class="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-black/40 font-mono"
            >
              <span>Fullstack Commitment</span>
              <Zap class="size-4 text-primary" />
            </div>
          </div>

          <!-- Pitch Block 2 -->
          <div
            class="pitch-card group relative p-8 flex flex-col justify-between hover:-translate-y-1"
          >
            <div class="space-y-4">
              <div
                class="size-12 flex items-center justify-center font-extrabold text-xl border border-primary/20"
              >
                02
              </div>
              <h3 class="text-2xl font-bold text-black">Obsession with Speed & Clean Code</h3>
              <p class="text-black/70 leading-relaxed text-sm lg:text-base">
                "Clean code isn't a luxury; it's the foundation of longevity. By focusing on type
                safety, modular composables, optimized database queries, and lightweight assets, I
                build systems that scale without technical debt."
              </p>
            </div>
            <div
              class="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-black/40 font-mono"
            >
              <span>Architecture & Quality</span>
              <Cpu class="size-4 text-primary" />
            </div>
          </div>

          <!-- Pitch Block 3 -->
          <div
            class="pitch-card group relative p-8 flex flex-col justify-between hover:-translate-y-1"
          >
            <div class="space-y-4">
              <div
                class="size-12 flex items-center justify-center font-extrabold text-xl border border-primary/20"
              >
                03
              </div>
              <h3 class="text-2xl font-bold text-black">Delivering Measurable Impact</h3>
              <p class="text-black/70 leading-relaxed text-sm lg:text-base">
                "From initial architecture design to final deployment pipelines, I collaborate
                closely to turn complex requirements into slick intuitive products that delight
                users and drive real business success."
              </p>
            </div>
            <div
              class="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-black/40 font-mono"
            >
              <span>Client & User Value</span>
              <ShieldCheck class="size-4 text-primary" />
            </div>
          </div>
        </div>
      </section>

      <!-- ─── SKILLS ────── -->
      <section id="skills-section" class="relative">
        <div class="flex flex-row justify-center gap-36">
          <!-- COLUMN 1: DEVELOPMENT SKILLS -->
          <div class="space-y-6">
            <div class="flex items-center">
              <h3 class="text-xl font-bold text-black">Development Domains</h3>
            </div>

            <div class="">
              <div v-for="(skill, idx) in developmentSkills" :key="idx" class="skill-row-1-card">
                <div>
                  <h4 class="text-xs font-bold text-black">{{ skill }}</h4>
                </div>
              </div>
            </div>
          </div>

          <!-- COLUMN 2: TECHNOLOGIES -->
          <div id="tech-row-2" class="space-y-6">
            <div class="flex items-center gap-3">
              <h3 class="text-xl font-bold text-black">Technologies</h3>
            </div>

            <div class="grid grid-cols-1">
              <div
                v-for="(tech, idx) in technologies"
                :key="idx"
                class="tech-pill group flex flex-col justify-between cursor-default"
              >
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono text-black">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ───EXPERTISE ────────── -->
      <section id="further-expertise-section" class="relative space-y-10">
        <div class="flex flex-col">
          <div
            v-for="(item, index) in expertiseItems"
            :key="index"
            class="further-card group relative p-8 flex flex-col justify-between"
          >
            <div class="mb-24">
              <h3 class="text-5xl font-bold text-black text-center">Expertise</h3>
            </div>

            <div class="flex flex-row justify-between items-center gap-6">
              <div class="w-1/3 flex flex-row gap-20 items-center">
                <span class="font-bold text-xl text-black"> 0{{ index + 1 }} </span>
                <h3 class="text-2xl font-bold text-black">{{ item.title }}</h3>
              </div>

              <div class="w-1/3">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-105 h-70 object-cover shadow-2xl pointer-events-auto"
                />
              </div>

              <div class="w-1/3">
                <div class="flex flex-wrap gap-x-4 gap-y-2 mb-6 text-xs uppercase font-mono">
                  <span v-for="skill in item.skills" :key="skill" class="expertise-item-skill"
                    >/ {{ skill }}</span
                  >
                </div>

                <RouterLink
                  to="/projects"
                  class="primary-button group relative flex justify-between items-center gap-2.5 text-brand-black font-bold px-8 py-3 border rounded-full cursor-pointer overflow-hidden text-sm w-fit"
                  @mouseenter="animatePrimaryButtonHover"
                  @mouseleave="animatePrimaryButtonHoverOut"
                >
                  <div
                    class="fill absolute left-0 w-full h-full bg-black translate-y-full pointer-events-none"
                  ></div>

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
          </div>
        </div>
      </section>
    </main>

    <!-- Navigation Footer -->
    <AppFooter />
  </div>
</template>
