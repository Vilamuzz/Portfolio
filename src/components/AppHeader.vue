<script setup>
import { ref, watch, onUnmounted } from "vue";
import gsap from "gsap";
import { useLenis } from "@/composables/useLenis";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

watch(isMenuOpen, (isOpen) => {
  const { lenis } = useLenis();
  if (isOpen) {
    if (lenis) lenis.stop();
    gsap.set("#navigation-menu", { y: "100%" });
    gsap.to("#navigation-menu", {
      y: "0%",
      duration: 0.6,
      ease: "power3.out",
    });
  } else {
    if (lenis) lenis.start();
    gsap.to("#navigation-menu", {
      y: "-100%",
      duration: 0.6,
      ease: "power3.in",
    });
  }
});

onUnmounted(() => {
  const { lenis } = useLenis();
  if (lenis) lenis.start();
});
</script>

<template>
  <nav class="fixed top-0 left-0 w-full px-6 sm:px-10 py-5 sm:py-8 z-50">
    <div id="navbar" class="relative flex flex-row justify-between items-center w-full z-50">
      <RouterLink to="/" @click="isMenuOpen = false">
        <img src="@/assets/img/logo.png" alt="Logo" class="w-8 sm:w-10 cursor-pointer" />
      </RouterLink>
      <button
        type="button"
        @click="toggleMenu"
        class="w-fit bg-brand-blue text-white px-5 py-2.5 sm:py-3 rounded-full text-xs font-bold cursor-pointer select-none active:scale-95 transition-transform"
        :aria-expanded="isMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <span>{{ isMenuOpen ? "CLOSE" : "MENU" }}</span>
      </button>
    </div>

    <div
      id="navigation-menu"
      class="fixed inset-0 w-full h-screen bg-brand-navy/95 backdrop-blur-md z-40 flex flex-col justify-between px-6 pt-24 pb-8 sm:p-16 sm:pt-36 translate-y-full overflow-y-auto"
    >
      <div class="flex flex-col sm:flex-row items-start justify-between w-full gap-8 sm:gap-0">
        <div class="w-full sm:w-1/2">
          <div class="w-full flex flex-col gap-4 sm:gap-6 text-3xl sm:text-5xl md:text-6xl font-extrabold text-white">
            <RouterLink
              to="/projects"
              @click="isMenuOpen = false"
              class="hover:text-primary transition-colors w-fit"
            >
              Projects
            </RouterLink>
            <RouterLink
              to="/experience"
              @click="isMenuOpen = false"
              class="hover:text-primary transition-colors w-fit"
            >
              Experiences
            </RouterLink>
            <RouterLink
              to="/expertise"
              @click="isMenuOpen = false"
              class="hover:text-primary transition-colors w-fit"
            >
              Expertise
            </RouterLink>
          </div>
        </div>
        <div class="w-full sm:w-1/2 flex flex-row flex-wrap sm:flex-col sm:items-center gap-4 text-base sm:text-lg font-semibold text-white/60">
          <a
            href="https://instagram.com/vilamuzz"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a href="#" class="hover:text-white transition-colors">Twitter</a>
          <a
            href="https://www.linkedin.com/in/andy-kasa"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a href="mailto:vilamuzz@gmail.com" class="hover:text-white transition-colors">Email</a>
          <a
            href="https://github.com/Vilamuzz"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-white transition-colors"
          >
            Github
          </a>
        </div>
      </div>
      <div class="w-full text-end pt-6 sm:pt-0">
        <h1 class="text-6xl sm:text-7xl lg:text-9xl font-extrabold text-white/5 select-none">Vilamuzz</h1>
      </div>
    </div>
  </nav>
</template>
