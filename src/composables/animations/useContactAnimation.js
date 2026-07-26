import gsap from "gsap";

export function useContactAnimation() {
  const animateContact = () => {
    gsap.fromTo(
      "#contact > div > div",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  };

  return { animateContact };
}
