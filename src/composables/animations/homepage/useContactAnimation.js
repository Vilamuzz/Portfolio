import gsap from "gsap";

export function useContactAnimation() {
  const animateContact = () => {
    const contact = document.querySelector("#contact");
    if (!contact) return;

    const mm = gsap.matchMedia();

    // Desktop: dynamic scrubbed depth
    mm.add("(min-width: 1024px)", () => {
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
        { y: -100 },
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
        { y: -80 },
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
        { y: -100 },
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
    });

    // Mobile & Tablet: Clean vertical fade & slide without extreme scrub
    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(
        ["#contact-subtitle", "#contact-heading", "#contact-socials"],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#contact",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  };

  return { animateContact };
}
