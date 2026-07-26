import gsap from "gsap";

export function useButtonAnimation() {
  const animateButtonHover = (e) => {
    const btn = e.currentTarget;
    const ripple = btn.querySelector(".ripple");

    gsap.to(ripple, {
      scale: 10,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const animateButtonHoverOut = (e) => {
    const btn = e.currentTarget;
    const ripple = btn.querySelector(".ripple");

    gsap.to(ripple, {
      scale: 0,
      duration: 0.4,
      ease: "power2.in",
    });
  };

  return { animateButtonHover, animateButtonHoverOut };
}
