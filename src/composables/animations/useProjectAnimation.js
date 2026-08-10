import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTextAnimation } from "./useTextAnimation";
import { useButtonAnimation } from "./useButtonAnimation";

export function useProjectAnimation() {
  const { animateTextSlideUp, animateWaveText } = useTextAnimation();
  const { animatePrimaryButtonIntro } = useButtonAnimation();

  const animateProjects = () => {
    const projectsTrack = document.querySelector("#projects .flex.w-max");
    if (!projectsTrack) return;

    const totalCardWidth = projectsTrack.scrollWidth - window.innerWidth;
    const scrollDuration = totalCardWidth / window.innerWidth;

    // Main timeline that handles vertical scroll pin, horizontal translation, and trailing bar reveals
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-projects-wrapper",
        start: "top top",
        end: () => `+=${window.innerWidth + totalCardWidth + 500}`,
        pin: true,
        scrub: 1,
        anticipatePin: 0,
        invalidateOnRefresh: true,
      },
    });

    // 1. Slide #projects over #hero (covers it)
    tl.to("#projects", {
      x: "-100vw",
      ease: "none",
      duration: 1,
    });

    // 2. Scroll project cards horizontally until the trailing panel is fully in view
    tl.to(projectsTrack, {
      x: -totalCardWidth,
      ease: "none",
      duration: scrollDuration,
    });

    // 3. Trigger reusable text reveal animations when each card enters the viewport
    const cards = document.querySelectorAll("#projects a");
    cards.forEach((card) => {
      const pTags = card.querySelectorAll(".project-meta-item");
      const chars = card.querySelectorAll(".project-title-char");

      if (pTags.length > 0) {
        animateTextSlideUp(pTags, {
          trigger: card,
          containerAnimation: tl,
          start: "left 70%",
          duration: 0.5,
          stagger: 0.1,
        });
      }

      if (chars.length > 0) {
        animateWaveText(chars, {
          trigger: card,
          containerAnimation: tl,
          start: "left 70%",
          staggerEnter: 0.03,
          staggerExit: 0,
        });
      }

      const btnIcon = card.querySelector(".project-btn-icon");
      if (btnIcon) {
        gsap.set(btnIcon, { scale: 0, opacity: 0 });

        ScrollTrigger.create({
          trigger: card,
          containerAnimation: tl,
          start: "left 70%",
          onEnter: () => {
            gsap.to(btnIcon, {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
          onLeaveBack: () => {
            gsap.to(btnIcon, {
              scale: 0,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
              overwrite: "auto",
            });
          },
        });
      }
    });

    // 4. Trigger wave animation for the trailing Projects heading
    const headingChars = document.querySelectorAll("#projects .projects-heading-char");
    if (headingChars.length > 0) {
      const endPanel = document.querySelector("#projects-end-panel");

      animateWaveText(headingChars, {
        trigger: endPanel || headingChars[0],
        containerAnimation: tl,
        start: "left 80%",
        staggerEnter: 0.04,
        staggerExit: 0,
      });
    }

    // 5. Trigger slide-up animation for the trailing list items
    const listItems = document.querySelectorAll("#projects .projects-list-item");
    if (listItems.length > 0) {
      const endPanel = document.querySelector("#projects-end-panel");

      animateTextSlideUp(listItems, {
        trigger: endPanel || listItems[0],
        containerAnimation: tl,
        start: "left 80%",
        duration: 0.5,
        stagger: 0.08,
      });
    }

    // Trigger slide-up animation for the trailing paragraph lines
    const endTexts = document.querySelectorAll("#projects .projects-end-text");
    if (endTexts.length > 0) {
      const endPanel = document.querySelector("#projects-end-panel");

      animateTextSlideUp(endTexts, {
        trigger: endPanel || endTexts[0],
        containerAnimation: tl,
        start: "left 80%",
        duration: 0.5,
        stagger: 0.08,
      });
    }

    // Trigger primary button intro entrance animation for Projects end panel
    const endBtn = document.querySelector("#projects-end-panel .primary-button");
    if (endBtn) {
      animatePrimaryButtonIntro(endBtn, {
        containerAnimation: tl,
        start: "left 80%",
      });
    }

    // 6. Animate trailing divider bars AFTER horizontal scroll is completely finished
    const bars = document.querySelectorAll("#projects .project-list-bar");
    if (bars.length > 0) {
      gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });

      tl.to(bars, {
        scaleX: 1,
        stagger: 0.15,
        ease: "none",
        duration: 0.5,
      });
    }
  };

  return { animateProjects };
}
