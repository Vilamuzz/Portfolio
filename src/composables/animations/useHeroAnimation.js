import gsap from "gsap";

export function useHeroAnimation() {
  const animateHero = () => {
    gsap.fromTo(
      [".hero-title", ".hero-subtitle", ".hero-description"],
      { y: "100%" },
      { y: "0%", duration: 0.8, stagger: 0.2, ease: "power2.out" },
    );

    gsap.fromTo(
      "#hero-cv-btn, #hero-card",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.7, stagger: 0.2, ease: "power2.out" },
    );
  };

  return { animateHero };
}
