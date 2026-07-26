import gsap from "gsap";

export function useProjectsAnimation() {
  const animateProjects = () => {
    gsap.fromTo(
      "#projects article",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: "#projects",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  };

  return { animateProjects };
}
