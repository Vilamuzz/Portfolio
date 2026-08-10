import gsap from "gsap";

export function useContactAnimation() {
  const animateContact = () => {
    // Entrance fade-in animation (existing)
    gsap.fromTo(
      "#contact > div",
      { y: 30 },
      {
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

    gsap.fromTo(
      "#contact-socials",
      { y: -170 },
      {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#contact",
          start: "center bottom",
          end: "bottom bottom",
          scrub: true,
        },
      },
    );

    gsap.fromTo(
      "#contact-heading",
      { y: -160 },
      {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#contact",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      },
    );

    gsap.fromTo(
      "#contact-subtitle",
      { y: -200 },
      {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#contact",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      },
    );
  };

  return { animateContact };
}
