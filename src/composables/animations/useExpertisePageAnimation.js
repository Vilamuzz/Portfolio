import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { useLenis } from "@/composables/useLenis";

export function useExpertisePageAnimation(containerRef) {
  let ctx;

  onMounted(() => {
    // Reset scroll position via Lenis singleton
    const { scrollToTop } = useLenis();
    scrollToTop();

    ctx = gsap.context(() => {
      // Entrance animations for pitch cards
      gsap.fromTo(
        ".pitch-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
      );

      // Row 1 animation - Development domains
      gsap.fromTo(
        ".skill-row-1-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#skills-section",
            start: "top 80%",
          },
        },
      );

      // Row 2 tech pills animation
      gsap.fromTo(
        ".tech-pill",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: "#tech-row-2",
            start: "top 85%",
          },
        },
      );

      // Section 3 further expertise animation
      gsap.fromTo(
        ".further-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#further-expertise-section",
            start: "top 80%",
          },
        },
      );
    }, containerRef.value);
  });

  onUnmounted(() => {
    ctx?.revert();
  });
}
