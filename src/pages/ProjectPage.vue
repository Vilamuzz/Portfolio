<script setup>
import { ref, computed } from "vue";
import projects from "@/data/projects.json";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import { useProjectPageAnimation } from "@/composables/animations/useProjectPageAnimation";

const selectedCategory = ref("All");
const categories = ["All", "Fullstack", "Frontend", "Backend"];

const containerRef = ref(null);
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

useProjectPageAnimation(containerRef, { titleRef, descRef, tabsRef }, selectedCategory);
</script>

<template>
  <div ref="containerRef" class="relative bg-primary min-h-screen w-full text-brand-black font-sans">
    <!-- Header/Navigation -->
    <AppHeader />

    <div class="px-6 sm:px-10 pt-28 sm:pt-36 mb-12 sm:mb-16">
      <h1 ref="titleRef" class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight opacity-0">
        Projects
      </h1>
      <p
        ref="descRef"
        class="text-lg sm:text-2xl text-brand-black/80 font-medium max-w-4xl mt-4 leading-relaxed opacity-0"
      >
        Each project prioritizes excellence with the goal of immersing your visitors in a powerful
        and impactful universe. We believe that nothing beats an immersive experience, and
        especially one that is uniquely yours.
      </p>
    </div>

    <div
      ref="tabsRef"
      class="flex flex-wrap justify-center gap-3 sm:gap-6 border-b border-t border-black py-6 sm:py-8 px-4 font-bold opacity-0"
    >
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        class="relative px-5 sm:px-6 py-2 uppercase tracking-widest text-xs sm:text-sm transition-all duration-300 rounded-full border-2 border-transparent cursor-pointer"
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
        class="project-card group flex flex-col justify-between items-center overflow-hidden h-96 sm:h-100 border-b border-black"
        :class="{ 'md:border-r': index % 2 === 0 }"
      >
        <div class="text-center pt-4">
          <h3 class="text-xl sm:text-2xl font-bold">{{ project.title }}</h3>
          <h4 class="text-xs sm:text-sm mt-1 text-brand-black/80">{{ project.role }}</h4>
        </div>

        <div class="w-4/5 sm:w-3/4 h-3/5 sm:h-3/4 overflow-hidden relative bg-brand-navy rounded-lg sm:rounded-none">
          <img
            :src="project.img"
            :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div
          class="flex flex-row justify-between w-full px-6 py-4 text-xs font-semibold tracking-wider uppercase font-mono"
        >
          <span>{{ project.tag }}</span>
          <span>{{ project.year }}</span>
        </div>
      </a>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-24 px-6 text-center max-w-lg mx-auto"
    >
      <div
        class="size-16 rounded-full bg-brand-black/10 flex items-center justify-center text-brand-black mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 class="text-2xl font-bold mb-2">No Projects Found</h3>
      <p class="text-brand-black/70 mb-8 text-sm">
        We couldn't find any projects matching the "{{ selectedCategory }}" category.
      </p>
      <button
        @click="selectedCategory = 'All'"
        class="px-6 py-2.5 bg-brand-black text-primary font-bold text-xs uppercase tracking-wider rounded-full hover:bg-black/80 transition-colors"
      >
        Reset Filter
      </button>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
