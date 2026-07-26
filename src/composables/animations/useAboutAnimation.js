import gsap from "gsap";

export function useAboutAnimation() {
  const animateAbout = () => {
    gsap.fromTo(
      "#about .space-y-6, #about .grid",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  };
  return { animateAbout };
}
