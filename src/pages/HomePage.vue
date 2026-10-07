<script setup>
import { ref, computed } from "vue";
import { ArrowUpRight, ArrowDown } from "@lucide/vue";
import projects from "@/data/projects.json";
import expertiseItems from "@/data/expertise.json";
import experienceData from "@/data/experience.json";
import services from "@/data/services.json";
import cvPdf from "@/assets/doc/Curriculum Vitae Andy Kasa Sanjaya.pdf";
import { useHomePageAnimation } from "@/composables/animations/homepage/useHomePageAnimation";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

const containerRef = ref(null);
const featuredProjects = computed(() => projects.slice(0, 4));
const experienceItems = experienceData.workExperiences;
const {
  animateHeroButtonHover,
  animateHeroButtonHoverOut,
  animateProjectCardHover,
  animateProjectCardHoverOut,
  animatePrimaryButtonHover,
  animatePrimaryButtonHoverOut,
} = useHomePageAnimation(containerRef);
</script>

<template>
  <div ref="containerRef"
    class="min-h-screen w-full bg-brand-black font-sans text-white selection:bg-white selection:text-brand-black lg:overflow-x-hidden">
    <!-- Header/Navigation -->
    <AppHeader />

    <!-- ─── HORIZONTAL / RESPONSIVE WRAPPER ─────────────────────── -->
    <div id="hero-projects-wrapper" class="relative w-full lg:overflow-hidden">
      <div class="w-full lg:flex lg:flex-row lg:w-max">
        <!-- ─── HERO ────────────────────────────────────────────────────── -->
        <section id="hero"
          class="relative w-full lg:w-screen min-h-screen flex items-center justify-center overflow-hidden px-6 shrink-0 py-24 lg:py-0">
          <div
            class="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 pt-16 lg:pt-24">
            <div class="flex-1 space-y-6 lg:space-y-8 w-full text-center lg:text-left">
              <div class="space-y-4">
                <div class="overflow-hidden">
                  <h1
                    class="hero-title text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight translate-y-full">
                    Hi, I'm
                    <span class="group inline-grid grid-cols-1 grid-rows-1 overflow-hidden pb-2 lg:pb-3">
                      <span
                        class="col-start-1 row-start-1 transition-all duration-500 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">Andy</span>
                      <span
                        class="col-start-1 row-start-1 translate-y-full opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 text-primary">Vilamuzz</span>
                    </span>
                  </h1>
                </div>
                <div class="overflow-hidden">
                  <p class="hero-subtitle text-xl sm:text-2xl text-primary font-bold translate-y-full">
                    Fullstack Developer
                  </p>
                </div>
              </div>

              <div class="overflow-hidden">
                <p
                  class="hero-description text-white/50 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 translate-y-full">
                  Crafting robust system, high-performance web experiences with a passion for clean
                  code and delightful interactions.
                </p>
              </div>
              <div class="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                <a id="hero-cv-btn" :href="cvPdf" download="Andy_Kasa_Sanjaya_CV.pdf"
                  class="group relative flex items-center gap-2.5 bg-primary text-brand-black font-bold px-6 py-3 rounded-full cursor-pointer overflow-hidden opacity-0 translate-y-15"
                  @mouseenter="animateHeroButtonHover" @mouseleave="animateHeroButtonHoverOut">
                  <div class="ripple absolute right-8 w-10 h-10 bg-white rounded-full pointer-events-none scale-0">
                  </div>

                  <span class="relative z-10 text-sm sm:text-base">Download CV</span>
                  <div class="btn-icon-badge relative z-10 bg-white text-black rounded-full p-2 scale-30">
                    <div class="overflow-hidden">
                      <ArrowDown class="down-arrow size-4 translate-y-full" />
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <!-- Hero Image -->
            <div id="hero-card" class="shrink-0 relative opacity-0 translate-y-15">
              <div class="relative w-auto h-64 sm:h-72 lg:w-80 lg:h-96 flex items-end justify-center">
                <img src="@/assets/img/me.png" alt="Andy Vilamuzz"
                  class="relative z-10 w-auto h-full object-cover border-b-4 border-primary pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        <!-- ─── PROJECTS ───────────────────────────────────────────────────── -->
        <section id="projects" class="relative z-20 w-full lg:w-max h-screen bg-primary shrink-0 overflow-hidden">
          <div id="projects-track" class="relative w-full h-full lg:flex lg:flex-row lg:w-max">
            <a v-for="(project, i) in featuredProjects" :key="project.title" :id="`project-${i}`" :href="project.link"
              target="_blank" rel="noopener noreferrer"
              class="project-card group absolute inset-0 w-full h-full lg:relative lg:inset-auto lg:w-150 lg:h-screen lg:shrink-0 bg-primary overflow-hidden flex flex-col justify-between cursor-pointer border-b lg:border-b-0 lg:border-r border-black/20 shadow-[0_-12px_30px_rgba(0,0,0,0.3)] lg:shadow-none"
              :style="{ zIndex: 10 + i * 10 }" @mouseenter="animateProjectCardHover"
              @mouseleave="animateProjectCardHoverOut">
              <div class="w-full flex-1 overflow-hidden relative bg-brand-navy min-h-0">
                <img :src="project.img" :alt="project.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div :class="[
                project.bgClass,
                'relative p-5 sm:p-6 lg:p-4 text-center text-brand-black shrink-0',
              ]">
                <div class="flex flex-row justify-between gap-2 text-xs font-mono uppercase">
                  <p class="project-meta-item">{{ project.year }}</p>
                  <p class="project-meta-item">{{ project.role }}</p>
                  <p class="project-meta-item">{{ project.tag }}</p>
                </div>
                <h3
                  class="project-card-title text-2xl sm:text-3xl lg:text-5xl font-bold text-center text-brand-black my-2 sm:my-4 leading-tight">
                  {{ project.title }}
                </h3>
                <div class="flex items-end justify-between">
                  <p class="font-mono text-sm">{{ String(i + 1).padStart(2, "0") }}</p>
                  <div
                    class="project-btn-icon relative size-11 sm:size-12 lg:size-15 rounded-full border border-brand-black flex items-center justify-center overflow-hidden">
                    <div class="ripple absolute w-full h-full bg-brand-black rounded-full pointer-events-none scale-0">
                    </div>

                    <div class="relative z-10 overflow-hidden size-4 sm:size-5 flex items-center justify-center">
                      <ArrowUpRight class="black-arrow size-4 sm:size-5 text-brand-black absolute" />
                      <ArrowUpRight
                        class="white-arrow size-4 sm:size-5 text-white absolute -translate-x-full translate-y-full" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
            <div id="projects-end-panel"
              class="absolute inset-0 w-full h-full lg:relative lg:inset-auto lg:w-[calc(100vw-37.5rem)] lg:min-w-125 lg:h-screen lg:shrink-0 flex flex-col justify-between p-6 sm:p-10 lg:p-12 border-b lg:border-b-0 border-black/20 bg-primary shadow-lg lg:shadow-none"
              :style="{ zIndex: 10 + featuredProjects.length * 10 }">
              <div class="pt-14 sm:pt-16 lg:pt-0">
                <h3 class="projects-heading text-black font-extrabold text-3xl sm:text-5xl lg:text-7xl leading-tight">
                  Projects
                </h3>
                <ul class="flex flex-col gap-3 sm:gap-6 mt-4 sm:mt-12">
                  <li v-for="(service, sIdx) in services" :key="service.title + sIdx" class="flex flex-col space-y-1">
                    <div class="flex justify-between w-full">
                      <a :href="service.link" class="projects-list-item font-bold text-sm sm:text-base lg:text-lg">
                        {{ service.title }}</a>
                      <p class="projects-list-item font-extrabold text-xs sm:text-sm">
                        {{ service.num }}
                      </p>
                    </div>
                    <div class="project-list-bar bg-black h-[0.1vh] w-full origin-left"></div>
                  </li>
                </ul>
              </div>
              <div class="flex flex-col my-4 lg:my-12 text-base sm:text-xl lg:text-2xl font-bold leading-tight">
                <p class="projects-end-text">Every Project i've been working on</p>
                <p class="projects-end-text">brings new architectural challenges</p>
                <p class="projects-end-text">and sharpens how I solve problems.</p>
              </div>
              <RouterLink to="/projects"
                class="primary-button group relative flex justify-between items-center gap-2.5 text-brand-black font-bold px-6 sm:px-8 py-3 sm:py-3.5 border border-black rounded-full cursor-pointer overflow-hidden text-xs sm:text-sm w-full sm:w-2/3 lg:w-1/2 mb-4 lg:mb-0"
                @mouseenter="animatePrimaryButtonHover" @mouseleave="animatePrimaryButtonHoverOut">
                <div class="fill absolute left-0 w-full h-full bg-black translate-y-full pointer-events-none"></div>

                <div class="overflow-hidden">
                  <span class="text inline-block relative z-10">SEE MORE PROJECTS</span>
                </div>
                <div class="btn-icon-badge relative z-10 bg-black text-black rounded-full p-2 scale-30">
                  <div class="overflow-hidden">
                    <ArrowUpRight class="arrow size-4 translate-y-full -translate-x-full" />
                  </div>
                </div>
              </RouterLink>
            </div>

            <!-- ─── EXPERIENCE SNAPSHOT (DESKTOP) ─────────────────────────────── -->
            <section id="experience"
              class="hidden lg:block lg:relative lg:inset-auto lg:w-screen lg:h-screen bg-brand-navy overflow-hidden lg:shrink-0 lg:shadow-none"
              :style="{ zIndex: 20 + featuredProjects.length * 10 }">
              <div
                class="relative flex flex-col lg:flex-row justify-between items-center w-full h-full px-6 sm:px-12 lg:px-20 py-16 lg:py-20 gap-6 lg:gap-0">
                <div id="experience-img-container"
                  class="hidden lg:flex lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-1/2 lg:h-1/2 items-center justify-center z-0 lg:pointer-events-none bg-brand-black lg:overflow-visible">
                  <img src="@/assets/img/iss.png" alt="ISS"
                    class="w-full lg:w-[120%] h-full lg:h-[120%] max-w-none object-contain" />
                </div>

                <div class="relative z-10 self-start space-y-2 sm:space-y-3 order-1 lg:order-0">
                  <h2 class="text-3xl sm:text-5xl font-extrabold">Experiences</h2>
                  <p class="text-sm sm:text-lg font-semibold text-white/80">
                    My Journey on my career
                  </p>
                  <RouterLink
                    class="primary-button group relative flex justify-between items-center gap-2.5 bg-primary text-brand-black font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full cursor-pointer overflow-hidden text-xs sm:text-sm w-fit"
                    to="/experience" @mouseenter="animatePrimaryButtonHover" @mouseleave="animatePrimaryButtonHoverOut">
                    <div class="fill absolute left-0 w-full h-full bg-black translate-y-full pointer-events-none"></div>

                    <div class="overflow-hidden">
                      <span class="text inline-block relative z-10">SEE EXPERIENCES</span>
                    </div>
                    <div class="btn-icon-badge relative z-10 bg-black text-black rounded-full p-2 scale-30">
                      <div class="overflow-hidden">
                        <ArrowUpRight class="arrow size-4 translate-y-full -translate-x-full" />
                      </div>
                    </div>
                  </RouterLink>
                </div>

                <div
                  class="relative z-10 self-start lg:self-end w-full lg:max-w-1/3 space-y-1 sm:space-y-2 order-3 lg:order-0">
                  <h3 class="text-lg sm:text-2xl font-extrabold">
                    I learn a lot from these journey
                  </h3>
                  <p class="text-xs sm:text-sm font-semibold text-white/60">
                    Ready to take on new challenges and grow as a professional and as a person.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>

    <!-- ─── EXPERIENCE SNAPSHOT (MOBILE) ───────────────────────────────── -->
    <section id="mobile-experience"
      class="block lg:hidden relative w-full bg-brand-navy text-white px-6 sm:px-12 pt-16 sm:pt-20 pb-8 sm:pb-12 -mt-px space-y-8">
      <div class="space-y-3">
        <h2 class="text-3xl sm:text-5xl font-extrabold">Experiences</h2>
        <p class="text-sm sm:text-lg font-semibold text-white/80">My Journey on my career</p>
        <RouterLink
          class="primary-button group relative flex justify-between items-center gap-2.5 bg-primary text-brand-black font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full cursor-pointer overflow-hidden text-xs sm:text-sm w-fit"
          to="/experience" @mouseenter="animatePrimaryButtonHover" @mouseleave="animatePrimaryButtonHoverOut">
          <div class="fill absolute left-0 w-full h-full bg-black translate-y-full pointer-events-none"></div>

          <div class="overflow-hidden">
            <span class="text inline-block relative z-10">SEE EXPERIENCES</span>
          </div>
          <div class="btn-icon-badge relative z-10 bg-black text-black rounded-full p-2 scale-30">
            <div class="overflow-hidden">
              <ArrowUpRight class="arrow size-4 translate-y-full -translate-x-full" />
            </div>
          </div>
        </RouterLink>
      </div>

      <div class="space-y-2">
        <h3 class="text-lg sm:text-2xl font-extrabold">I learn a lot from these journey</h3>
        <p class="text-xs sm:text-sm font-semibold text-white/60">
          Ready to take on new challenges and grow as a professional and as a person.
        </p>
      </div>
    </section>

    <!-- ─── EXPERIENCE TIMELINE ──────────────────────────────────────────── -->
    <section id="experience-timeline"
      class="relative w-full bg-brand-navy text-white pt-4 pb-16 sm:pb-24 lg:py-24 px-6 sm:px-12 lg:px-20 -mt-px flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
      <div class="hidden lg:block lg:w-1/4">
        <img src="@/assets/img/shuttle.png" alt="Shuttle" class="w-full sticky top-32" />
      </div>
      <div class="flex flex-col gap-6 sm:gap-8 w-full lg:w-2/3">
        <div v-for="item in experienceItems" :key="item.id"
          class="experience-item flex flex-col sm:flex-row w-full gap-6 p-6">
          <div
            class="w-full sm:w-1/3 lg:w-1/2 overflow-hidden rounded-xl bg-brand-black/40 flex items-center justify-center p-2">
            <img :src="item.logo || item.img" alt="Experience Image"
              class="w-full max-h-48 sm:max-h-none object-cover rounded-lg" />
          </div>
          <div class="flex flex-col sm:w-2/3 lg:w-1/2">
            <p class="text-primary text-xs font-bold uppercase tracking-widest mb-2">
              {{ item.period }}
            </p>
            <h3 class="text-2xl sm:text-3xl font-extrabold leading-tight mb-1">{{ item.role }}</h3>
            <p class="text-white/60 text-sm sm:text-base font-semibold mb-3">{{ item.company }}</p>
            <p v-if="item.description" class="text-white/50 text-sm leading-relaxed max-w-lg">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── EXPERTISE ──────────────────────────────────────────────────── -->
    <section id="expertise" class="relative w-full min-h-screen lg:h-screen lg:overflow-hidden bg-brand-black">
      <!-- Desktop header -->
      <div id="expertise-head"
        class="hidden lg:block absolute inset-0 w-full h-full pt-32 px-32 z-30 pointer-events-none">
        <h1 class="expertise-heading text-5xl font-bold pb-2">Expertise</h1>
      </div>
      <!-- Mobile header -->
      <div class="lg:hidden px-6 pt-16 pb-8">
        <h2 class="expertise-heading text-4xl sm:text-5xl font-extrabold text-white">Expertise</h2>
        <p class="text-white/60 text-base mt-2">Specialized proficiencies and technical domains.</p>
      </div>

      <!-- Desktop items container (pinned multi-stage animation) -->
      <div id="items" class="hidden lg:block absolute inset-0 w-full h-full z-10">
        <div v-for="(item, index) in expertiseItems" :key="item.title" class="item absolute inset-0 w-full h-full"
          :style="{ zIndex: (index + 1) * 10 }">
          <div class="inner absolute inset-0 w-full h-full">
            <div class="absolute inset-0 w-full h-full">
              <div :class="['background absolute inset-0 w-full h-full', item.bgClass]"></div>
              <div class="content absolute inset-0 w-full h-full flex flex-col justify-end px-32 pb-[15%] z-10">
                <h3 class="expertise-item-title text-3xl font-bold mb-6">{{ item.title }}</h3>
                <div class="flex flex-wrap gap-x-4 gap-y-2 max-w-1/3 mb-6 text-sm uppercase font-mono">
                  <span v-for="skill in item.skills" :key="skill" class="expertise-item-skill">/ {{ skill }}</span>
                </div>
                <RouterLink
                  class="primary-button group relative flex justify-between items-center gap-2.5 bg-primary text-brand-black font-bold px-8 py-3 rounded-full cursor-pointer overflow-hidden text-sm w-1/4"
                  to="/expertise" @mouseenter="animatePrimaryButtonHover" @mouseleave="animatePrimaryButtonHoverOut">
                  <div class="fill absolute left-0 w-full h-full bg-black translate-y-full pointer-events-none"></div>

                  <div class="overflow-hidden">
                    <span class="text inline-block relative z-10">SEE EXPERTISE</span>
                  </div>
                  <div class="btn-icon-badge relative z-10 bg-black text-black rounded-full p-2 scale-30">
                    <div class="overflow-hidden">
                      <ArrowUpRight class="arrow size-4 translate-y-full -translate-x-full" />
                    </div>
                  </div>
                </RouterLink>
              </div>
              <div
                class="image-container absolute right-1/5 top-1/2 -translate-y-1/2 z-20 pointer-events-none w-fit h-fit">
                <img :src="item.image" :alt="item.title"
                  class="w-105 h-70 object-cover shadow-2xl pointer-events-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile items container (vertical cards flow) -->
      <div id="mobile-expertise-items" class="lg:hidden pb-20 flex flex-col">
        <div v-for="(item, index) in expertiseItems" :key="'mobile-' + item.title" :class="[
          'mobile-expertise-card p-6 sm:p-8 flex flex-col justify-between overflow-hidden',
          item.bgClass,
        ]">
          <div class="space-y-4">
            <div class="flex justify-between items-start">
              <span class="font-mono text-xs font-bold uppercase tracking-wider text-white/60">0{{ index + 1 }}</span>
              <RouterLink to="/expertise" class="text-white hover:opacity-75 transition-opacity">
                <ArrowUpRight class="size-5" />
              </RouterLink>
            </div>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white">{{ item.title }}</h3>
            <div class="w-full h-48 rounded-xl overflow-hidden shadow-md my-4">
              <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
            </div>
            <div class="flex flex-wrap gap-2 pt-2">
              <span v-for="skill in item.skills" :key="skill"
                class="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-medium">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CONTACT ────────────────────────────────────────────────────── -->
    <AppFooter />
  </div>
</template>
