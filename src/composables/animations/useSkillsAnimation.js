import gsap from "gsap";

export function useSkillsAnimation() {
  const animateSkills = () => {
    gsap.fromTo(
      "#skills > div > div",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: "#skills",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  };

  return { animateSkills };
}
