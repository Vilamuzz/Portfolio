import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useButtonAnimation() {
  /**
   * Hero Button Animation: Scales white ripple circle and syncs icon badge colors + arrow reveal
   */
  const animateHeroButtonHover = (e) => {
    const btn = e.currentTarget;
    const ripple = btn.querySelector(".ripple");
    const iconBadge = btn.querySelector(".btn-icon-badge");
    const downArrow = btn.querySelector(".down-arrow");

    if (ripple) {
      gsap.killTweensOf(ripple);
      gsap.to(ripple, {
        scale: 10,
        duration: 0.5,
        ease: "power4.out",
      });
    }

    if (iconBadge) {
      gsap.killTweensOf(iconBadge);
      gsap.to(iconBadge, {
        backgroundColor: "#000000",
        color: "#ffffff",
        scale: 1,
        duration: 0.5,
        ease: "power4.out",
      });
    }

    if (downArrow) {
      gsap.killTweensOf(downArrow);
      gsap.to(downArrow, {
        y: "0%",
        duration: 0.5,
        ease: "power4.out",
      });
    }
  };

  const animateHeroButtonHoverOut = (e) => {
    const btn = e.currentTarget;
    const ripple = btn.querySelector(".ripple");
    const iconBadge = btn.querySelector(".btn-icon-badge");
    const downArrow = btn.querySelector(".down-arrow");

    if (ripple) {
      gsap.killTweensOf(ripple);
      gsap.to(ripple, {
        scale: 0,
        duration: 0.4,
        ease: "power4.in",
      });
    }

    if (iconBadge) {
      gsap.killTweensOf(iconBadge);
      gsap.to(iconBadge, {
        backgroundColor: "#ffffff",
        color: "#000000",
        scale: 0.3,
        duration: 0.4,
        delay: 0.1,
        ease: "power4.in",
      });
    }

    if (downArrow) {
      gsap.killTweensOf(downArrow);
      gsap.to(downArrow, {
        y: "100%",
        duration: 0.4,
        ease: "power4.in",
      });
    }
  };

  /**
   * Project Card Button Animation: Scales black ripple circle and triggers continuous upward arrow loop
   */
  const animateProjectCardHover = (e, targetScale = 1) => {
    const btn = e.currentTarget;
    const ripple = btn.querySelector(".ripple");
    const blackArrow = btn.querySelector(".black-arrow");
    const whiteArrow = btn.querySelector(".white-arrow");

    if (ripple) {
      gsap.killTweensOf(ripple);
      gsap.to(ripple, {
        scale: targetScale,
        duration: 0.5,
        ease: "power4.out",
      });
    }

    if (blackArrow && whiteArrow) {
      gsap.killTweensOf([blackArrow, whiteArrow]);

      // Black arrow flies UP-RIGHT out of view
      gsap.to(blackArrow, {
        x: "100%",
        y: "-100%",
        duration: 0.3,
        ease: "power2.out",
      });

      // White arrow enters UP-RIGHT from bottom-left into center
      gsap.set(whiteArrow, { x: "-100%", y: "100%" });
      gsap.to(whiteArrow, {
        x: "0%",
        y: "0%",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const animateProjectCardHoverOut = (e) => {
    const btn = e.currentTarget;
    const ripple = btn.querySelector(".ripple");
    const blackArrow = btn.querySelector(".black-arrow");
    const whiteArrow = btn.querySelector(".white-arrow");

    if (ripple) {
      gsap.killTweensOf(ripple);
      gsap.to(ripple, {
        scale: 0,
        duration: 0.4,
        ease: "power4.out",
      });
    }

    if (blackArrow && whiteArrow) {
      gsap.killTweensOf([blackArrow, whiteArrow]);

      // White arrow flies UP-RIGHT out of view
      gsap.to(whiteArrow, {
        x: "100%",
        y: "-100%",
        duration: 0.3,
        ease: "power2.out",
      });

      // Black arrow enters UP-RIGHT from bottom-left into center
      gsap.set(blackArrow, { x: "-100%", y: "100%" });
      gsap.to(blackArrow, {
        x: "0%",
        y: "0%",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const animatePrimaryButtonHover = (e) => {
    const btn = e.currentTarget;
    const fill = btn.querySelector(".fill");
    const iconBadge = btn.querySelector(".btn-icon-badge");
    const text = btn.querySelector(".text");
    const arrow = btn.querySelector(".arrow");

    if (text) {
      gsap.killTweensOf(text);
      gsap.to(text, {
        color: "#ffffff",
        duration: 0.5,
        ease: "power4.out",
      });
    }

    if (fill) {
      gsap.killTweensOf(fill);
      gsap.set(fill, { y: "100%" });
      gsap.to(fill, {
        y: "0%",
        duration: 0.5,
        ease: "power4.out",
      });
    }

    if (iconBadge) {
      gsap.killTweensOf(iconBadge);
      gsap.to(iconBadge, {
        backgroundColor: "#ffffff",
        color: "#000000",
        scale: 1,
        duration: 0.5,
        ease: "power4.out",
      });
    }

    if (arrow) {
      gsap.killTweensOf(arrow);
      gsap.set(arrow, { y: "100%", x: "-100%" });
      gsap.to(arrow, {
        y: "0%",
        x: "0%",
        duration: 0.5,
        ease: "power4.out",
      });
    }
  };

  const animatePrimaryButtonHoverOut = (e) => {
    const btn = e.currentTarget;
    const fill = btn.querySelector(".fill");
    const iconBadge = btn.querySelector(".btn-icon-badge");
    const text = btn.querySelector(".text");
    const arrow = btn.querySelector(".arrow");

    if (text) {
      gsap.killTweensOf(text);
      gsap.to(text, {
        color: "#000000",
        duration: 0.5,
        ease: "power4.in",
      });
    }

    if (fill) {
      gsap.killTweensOf(fill);
      gsap.to(fill, {
        y: "-100%",
        duration: 0.4,
        ease: "power4.in",
      });
    }

    if (iconBadge) {
      gsap.killTweensOf(iconBadge);
      gsap.to(iconBadge, {
        backgroundColor: "#000000",
        color: "#ffffff",
        scale: 0.3,
        duration: 0.4,
        delay: 0.1,
        ease: "power4.in",
      });
    }

    if (arrow) {
      gsap.killTweensOf(arrow);
      gsap.to(arrow, {
        y: "-100%",
        x: "100%",
        duration: 0.4,
        ease: "power4.in",
      });
    }
  };

  /**
   * Primary Button Scroll Entrance & Exit Animation (Intro & Outro)
   */
  const animatePrimaryButtonIntro = (btn, options = {}) => {
    if (!btn) return;

    const text = btn.querySelector(".text");
    const arrow = btn.querySelector(".arrow");
    const iconBadge = btn.querySelector(".btn-icon-badge");

    const { trigger = btn, containerAnimation = null, start = "top 80%" } = options;

    // Set initial hidden states
    gsap.set(btn, { opacity: 0, scale: 0.85, y: 20 });
    if (text) gsap.set(text, { x: "100%" });
    if (arrow) gsap.set(arrow, { x: "-100%", y: "100%" });
    if (iconBadge) gsap.set(iconBadge, { scale: 0.3 });

    const scrollTriggerConfig = {
      trigger,
      start,
      onEnter: () => {
        gsap.killTweensOf([btn, text, arrow, iconBadge]);

        gsap.to(btn, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (text) {
          gsap.to(text, {
            x: "0%",
            duration: 0.4,
            delay: 0.1,
            ease: "power2.out",
            overwrite: "auto",
          });
        }

        if (arrow) {
          gsap.to(arrow, {
            x: "0%",
            y: "0%",
            duration: 0.4,
            delay: 0.1,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      },
      onLeaveBack: () => {
        gsap.killTweensOf([btn, text, arrow, iconBadge]);

        if (text) {
          gsap.to(text, {
            x: "100%",
            duration: 0.3,
            ease: "power2.in",
            overwrite: "auto",
          });
        }

        if (arrow) {
          gsap.to(arrow, {
            x: "-100%",
            y: "100%",
            duration: 0.3,
            ease: "power2.in",
            overwrite: "auto",
          });
        }

        gsap.to(btn, {
          opacity: 0,
          scale: 0.85,
          y: 20,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.in",
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
    animateHeroButtonHover,
    animateHeroButtonHoverOut,
    animateProjectCardHover,
    animateProjectCardHoverOut,
    animatePrimaryButtonHover,
    animatePrimaryButtonHoverOut,
    animatePrimaryButtonIntro,
  };
}
