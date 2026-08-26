import { onMounted, onUnmounted, watch, nextTick } from "vue";
import gsap from "gsap";
import { useLenis } from "@/composables/useLenis";

export function useProjectPageAnimation(
  containerRef,
  { titleRef, descRef, tabsRef },
  selectedCategory,
) {
  let ctx;

  onMounted(() => {
    // Reset scroll position via Lenis singleton
    const { scrollToTop } = useLenis();
    scrollToTop();

    ctx = gsap.context(() => {
      // Entrance animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(titleRef.value, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });

      tl.fromTo(descRef.value, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6");

      tl.fromTo(tabsRef.value, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.5");

      tl.fromTo(
        ".project-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        "-=0.4",
      );
    }, containerRef.value);
  });

  watch(selectedCategory, () => {
    nextTick(() => {
      ctx?.add(() => {
        gsap.fromTo(
          ".project-card",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        );
      });
    });
  });

  onUnmounted(() => {
    ctx?.revert();
  });
}
