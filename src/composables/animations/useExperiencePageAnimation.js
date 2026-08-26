import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { useLenis } from "@/composables/useLenis";

export function useExperiencePageAnimation(containerRef) {
  let ctx;

  onMounted(() => {
    // Reset scroll position via Lenis singleton
    const { scrollToTop } = useLenis();
    scrollToTop();

    ctx = gsap.context(() => {
      // Header entrance animation
      gsap.fromTo(
        ".experience-header-content",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Section 1: Work Experience cards animation
      gsap.fromTo(
        ".experience-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#work-experience-section",
            start: "top 80%",
          },
        }
      );

      // Section 2: Certificate cards animation
      gsap.fromTo(
        ".certificate-card",
        { y: 35, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#certificates-section",
            start: "top 80%",
          },
        }
      );

      // Section 3: Achievement cards animation
      gsap.fromTo(
        ".achievement-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#achievements-section",
            start: "top 80%",
          },
        }
      );
    }, containerRef.value);
  });

  onUnmounted(() => {
    ctx?.revert();
  });
}
