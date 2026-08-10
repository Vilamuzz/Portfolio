import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useTextAnimation() {
  /**
   * Animates text elements sliding up from y: 120% to 0%.
   * Supports standard vertical ScrollTrigger or horizontal containerAnimation.
   */
  const animateTextSlideUp = (elements, options = {}) => {
    const {
      trigger = elements,
      containerAnimation = null,
      start = "top 85%",
      duration = 0.5,
      stagger = 0.1,
      ease = "power2.out",
      toggleActions = "play none none reverse",
    } = options;

    if (!elements || (Array.isArray(elements) && elements.length === 0)) return;

    gsap.set(elements, { y: "120%" });

    const scrollTriggerConfig = {
      trigger,
      start,
      toggleActions,
    };

    if (containerAnimation) {
      scrollTriggerConfig.containerAnimation = containerAnimation;
    }

    return gsap.fromTo(
      elements,
      { y: "120%" },
      {
        y: "0%",
        duration,
        stagger,
        ease,
        scrollTrigger: scrollTriggerConfig,
      },
    );
  };

  /**
   * Animates text characters with a wave stagger effect on enter,
   * and slides all characters down simultaneously on leaveBack.
   */
  const animateWaveText = (chars, options = {}) => {
    const {
      trigger = chars,
      containerAnimation = null,
      start = "top 80%",
      durationEnter = 0.5,
      durationExit = 0.4,
      staggerEnter = 0.03,
      staggerExit = 0,
      easeEnter = "power2.out",
      easeExit = "power2.in",
    } = options;

    if (!chars || (Array.isArray(chars) && chars.length === 0)) return;

    gsap.set(chars, { y: "120%" });

    const scrollTriggerConfig = {
      trigger,
      start,
      onEnter: () => {
        gsap.to(chars, {
          y: "0%",
          duration: durationEnter,
          stagger: staggerEnter,
          ease: easeEnter,
          overwrite: "auto",
        });
      },
      onLeaveBack: () => {
        gsap.to(chars, {
          y: "120%",
          duration: durationExit,
          stagger: staggerExit,
          ease: easeExit,
          overwrite: "auto",
        });
      },
    };

    if (containerAnimation) {
      scrollTriggerConfig.containerAnimation = containerAnimation;
    }

    return ScrollTrigger.create(scrollTriggerConfig);
  };

  return {
    animateTextSlideUp,
    animateWaveText,
  };
}
