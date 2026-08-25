<script setup>
import { ArrowUpRight, ArrowDown } from "@lucide/vue";
import projects from "@/data/projects.json";
import expertiseItems from "@/data/expertise.json";
import experienceItems from "@/data/experience.json";
import projectServices from "@/data/projectServices.json";
import cvPdf from "@/assets/doc/Curriculum Vitae Andy Kasa Sanjaya.pdf";
import { useInitAnimation } from "@/composables/animations/useInitAnimation";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

const {
  animateHeroButtonHover,
  animateHeroButtonHoverOut,
  animateProjectCardHover,
  animateProjectCardHoverOut,
  animatePrimaryButtonHover,
  animatePrimaryButtonHoverOut,
} = useInitAnimation();
</script>

<template>
  <div class="min-h-screen w-full bg-brand-black font-sans text-white">
    <!-- Header/Navigation -->
    <AppHeader />
    <!-- ─── HORIZONTAL WRAPPER ──────────────────────────────────── -->
    <div id="hero-projects-wrapper" class="relative w-screen overflow-hidden">
      <div class="flex w-max">
        <!-- ─── HERO ────────────────────────────────────────────────────── -->
        <section
          id="hero"
          class="relative w-screen min-h-screen flex items-center justify-center overflow-hidden px-6 shrink-0"
        >
          <div
            class="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 pt-24"
          >
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
                  <div
                    class="ripple absolute right-8 w-10 h-10 bg-white rounded-full pointer-events-none scale-0"
                  ></div>

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
        <section id="projects" class="relative z-20 w-max h-screen bg-primary shrink-0">
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
                  <p class="project-meta-item">{{ project.year }}</p>
                  <p class="project-meta-item">{{ project.role }}</p>
                  <p class="project-meta-item">{{ project.tag }}</p>
                </div>
                <h3
                  class="project-card-title text-5xl font-bold text-center text-brand-black mt-4 leading-tight"
                >
                  {{ project.title }}
                </h3>
                <div class="flex items-end justify-between">
                  <p>{{ String(i + 1).padStart(2, "0") }}</p>
                  <div
                    class="project-btn-icon relative size-15 rounded-full border border-brand-black flex items-center justify-center overflow-hidden"
                  >
                    <div
                      class="ripple absolute w-full h-full bg-brand-black rounded-full pointer-events-none scale-0"
                    ></div>

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
                <h3 class="projects-heading text-black font-extrabold text-7xl leading-tight">
                  Projects
                </h3>
                <ul class="flex flex-col gap-6 mt-12">
                  <li
                    v-for="(service, sIdx) in projectServices"
                    :key="service.title + sIdx"
                    class="flex flex-col space-y-1"
                  >
                    <div class="flex justify-between w-full">
                      <a :href="service.link" class="projects-list-item font-bold">{{
                        service.title
                      }}</a>
                      <p class="projects-list-item font-extrabold text-sm">{{ service.num }}</p>
                    </div>
                    <div class="project-list-bar bg-black h-[0.1vh] w-full origin-left"></div>
                  </li>
                </ul>
              </div>
              <div class="flex flex-col mt-12 text-2xl font-bold leading-tight">
                <p class="projects-end-text">Every Project i've been working on</p>
                <p class="projects-end-text">brings new architectural challenges</p>
                <p class="projects-end-text">and sharpens how I solve problems.</p>
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

            <!-- ─── EXPERIENCE ──────────────────────────────────────────────────── -->
            <section
              id="experience"
              class="relative z-30 w-screen h-screen bg-brand-navy overflow-hidden shrink-0"
            >
              <div
                class="relative flex flex-row justify-between items-center w-full h-screen px-20 py-20"
              >
                <div
                  id="experience-img-container"
                  class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 md:w-1/2 h-1/2 flex items-center justify-center z-0 pointer-events-none bg-brand-black overflow-visible"
                >
                  <img
                    src="@/assets/img/iss.png"
                    alt="ISS"
                    class="w-[120%] h-[120%] max-w-none object-contain"
                  />
                </div>

                <div class="relative z-10 self-start space-y-2">
                  <h2 class="text-5xl font-extrabold">Experiences</h2>
                  <p class="text-lg font-semibold">My Journey on my carrier</p>
                  <RouterLink
                    class="primary-button group relative flex justify-between items-center gap-2.5 bg-primary text-brand-black font-bold px-8 py-3 rounded-full cursor-pointer overflow-hidden text-sm w-fit"
                    to="expertise"
                    @mouseenter="animatePrimaryButtonHover"
                    @mouseleave="animatePrimaryButtonHoverOut"
                  >
                    <div
                      class="fill absolute left-0 w-full h-full bg-black translate-y-full pointer-events-none"
                    ></div>

                    <div class="overflow-hidden">
                      <span class="text inline-block relative z-10">SEE EXPERIENCES</span>
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

                <div class="relative z-10 self-end max-w-1/3 space-y-2">
                  <h3 class="text-2xl font-extrabold">I learn a lot from these journey</h3>
                  <p class="text-sm font-semibold">
                    Ready to take on new challenges and grow as a professional and as a person.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>

    <!-- ─── EXPERIENCE TIMELINE ──────────────────────────────────────────── -->
    <section
      id="experience-timeline"
      class="relative w-screen bg-brand-navy text-white py-24 px-20 overflow-y-auto -mt-px flex flex-row justify-between"
    >
      <div class="w-1/4"><img src="@/assets/img/shuttle.png" alt="Shuttle" /></div>
      <div class="flex flex-col gap-4 w-2/3">
        <div
          v-for="(item, index) in experienceItems"
          :key="item.place + index"
          class="experience-item flex flex-row w-full gap-4"
        >
          <div class="w-1/2 overflow-hidden">
            <img :src="item.img" alt="Experience Image" class="w-full h-auto" />
          </div>
          <div class="flex flex-col">
            <p class="text-primary text-xs font-bold uppercase tracking-widest mb-3">
              {{ item.start }} &ndash; {{ item.end }}
            </p>
            <h3 class="text-3xl font-extrabold leading-tight mb-1">{{ item.role }}</h3>
            <p class="text-white/60 text-base font-semibold mb-4">{{ item.place }}</p>
            <p v-if="item.description" class="text-white/50 text-sm leading-relaxed max-w-lg">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── EXPERTISE ──────────────────────────────────────────────────── -->
    <section id="expertise" class="relative w-screen h-screen overflow-hidden bg-brand-black">
      <div id="head" class="absolute inset-0 w-full h-full pt-32 px-32 z-30 pointer-events-none">
        <h1 class="expertise-heading text-5xl font-bold pb-2">Expertise</h1>
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
                <h3 class="expertise-item-title text-3xl font-bold mb-6">{{ item.title }}</h3>
                <div class="flex flex-wrap gap-x-4 gap-y-2 max-w-1/3 mb-6 text-sm uppercase">
                  <span v-for="skill in item.skills" :key="skill" class="expertise-item-skill"
                    >/ {{ skill }}</span
                  >
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
    <AppFooter />
  </div>
</template>
