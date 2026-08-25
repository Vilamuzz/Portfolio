<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import gsap from "gsap";
import { useLenis } from "@/composables/useLenis";
import projects from "@/data/projects.json";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

const selectedCategory = ref("All");
const categories = ["All", "Fullstack", "Frontend", "Backend"];

const titleRef = ref(null);
const descRef = ref(null);
const tabsRef = ref(null);

const filteredProjects = computed(() => {
  if (selectedCategory.value === "All") return projects;
  const searchStr = selectedCategory.value.toLowerCase();
  return projects.filter((project) => {
    const roleMatches = project.role?.toLowerCase().includes(searchStr);
    const tagMatches = project.tag?.toLowerCase().includes(searchStr);
    return roleMatches || tagMatches;
  });
});

onMounted(() => {
  // Reset scroll position via the global singleton
  const { scrollToTop } = useLenis();
  scrollToTop();

  // GSAP entrance animations
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(titleRef.value, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
    .fromTo(descRef.value, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
    .fromTo(tabsRef.value, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.5")
    .fromTo(
      ".project-card",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
      "-=0.4",
    );
});

watch(selectedCategory, () => {
  nextTick(() => {
    gsap.fromTo(
      ".project-card",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
    );
  });
});
</script>

<template>
  <div class="relative bg-primary min-h-screen w-full text-brand-black font-sans">
    <!-- Header/Navigation -->
    <AppHeader />

    <div class="px-10 pt-36 mb-16">
      <h1 ref="titleRef" class="text-7xl font-extrabold tracking-tight opacity-0">Projects</h1>
      <p
        ref="descRef"
        class="text-2xl text-brand-black/80 font-medium max-w-4xl mt-4 leading-relaxed opacity-0"
      >
        Each project prioritizes excellence with the goal of immersing your visitors in a powerful
        and impactful universe. We believe that nothing beats an immersive experience, and
        especially one that is uniquely yours.
      </p>
    </div>

    <div
      ref="tabsRef"
      class="flex flex-wrap justify-center gap-6 border-b border-t border-black py-8 px-4 font-bold opacity-0"
    >
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        class="relative px-6 py-2 uppercase tracking-widest text-sm transition-all duration-300 rounded-full border-2 border-transparent cursor-pointer"
        :class="[
          selectedCategory === cat
            ? 'bg-brand-black text-primary border-brand-black'
            : 'bg-transparent text-brand-black/60 hover:text-brand-black hover:border-brand-black/20 hover:bg-brand-black/5',
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <div
      v-if="filteredProjects.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto"
    >
      <a
        v-for="(project, index) in filteredProjects"
        :key="project.title"
        :href="project.link"
        target="_blank"
        rel="noopener noreferrer"
        class="project-card group flex flex-col justify-between items-center overflow-hidden h-100 border-b border-black"
        :class="{ 'border-r': index % 2 === 0 }"
      >
        <div class="text-center">
          <h3 class="text-2xl font-bold">{{ project.title }}</h3>
          <h4 class="text-sm mt-1">{{ project.role }}</h4>
        </div>

        <div class="w-3/4 h-3/4 overflow-hidden relative bg-brand-navy">
          <img
            :src="project.img"
            :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div
          class="flex flex-row justify-between w-full p-6 text-xs font-semibold tracking-wider uppercase"
        >
          <span>{{ project.tag }}</span>
          <span>{{ project.year }}</span>
        </div>
      </a>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-20 text-center text-brand-black/60"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 mb-4 opacity-50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
      <h3 class="text-xl font-bold">No Projects Found</h3>
      <p class="text-sm mt-1">More projects in this category are coming soon!</p>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
