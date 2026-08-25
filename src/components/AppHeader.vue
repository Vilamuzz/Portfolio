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
  <nav class="fixed top-0 left-0 w-screen px-10 py-8 z-50">
    <div id="navbar" class="relative flex flex-row justify-between w-full z-50">
      <RouterLink to="/" @click="isMenuOpen = false">
        <img src="@/assets/img/logo.png" alt="Logo" class="w-10 cursor-pointer" />
      </RouterLink>
      <div
        @click="toggleMenu"
        class="w-fit bg-brand-blue text-white px-5 py-3 rounded-full text-xs font-bold cursor-pointer select-none active:scale-95 transition-transform"
      >
        <span>{{ isMenuOpen ? "CLOSE" : "MENU" }}</span>
      </div>
    </div>

    <div
      id="navigation-menu"
      class="fixed inset-0 w-full h-screen bg-brand-navy/95 backdrop-blur-md z-40 flex flex-col justify-between p-16 pt-36 translate-y-full"
    >
      <div class="flex flex-row items-start justify-between w-full">
        <div class="w-1/2">
          <div class="w-full flex flex-col gap-6 text-4xl md:text-6xl font-extrabold text-white">
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
        <div class="w-1/2 flex flex-col items-center gap-4 text-lg font-semibold text-white/60">
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
      <div class="w-full text-end">
        <h1 class="text-7xl lg:text-9xl font-extrabold text-white/5 select-none">Vilamuzz</h1>
      </div>
    </div>
  </nav>
</template>
