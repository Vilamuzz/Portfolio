import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTextAnimation } from "../useTextAnimation";
import { useButtonAnimation } from "../useButtonAnimation";
import { useExperienceAnimation } from "./useExperienceAnimation";

export function useProjectAnimation() {
  const { animateTextSlideUp, animateWaveText } = useTextAnimation();
  const { animatePrimaryButtonIntro } = useButtonAnimation();
  const { animateExperience } = useExperienceAnimation();

  const animateProjects = () => {
    const mm = gsap.matchMedia();

    // ─── DESKTOP (≥ 1024px): Pinned Horizontal Cinematic Sequence ───────────────
    mm.add("(min-width: 1024px)", () => {
      const projectsTrack = document.querySelector("#projects-track");
      const endPanel = document.querySelector("#projects-end-panel");
      if (!projectsTrack || !endPanel) return;

      const endPanelWidth = endPanel.offsetWidth;
      const lastCardWidth = Math.max(0, window.innerWidth - endPanelWidth);
      const endPanelTargetX = Math.min(0, -(endPanel.offsetLeft - lastCardWidth));

      const step1Duration = Math.abs(endPanelTargetX) / window.innerWidth;
      const barsDuration = 0.5;
      const phaseADuration = endPanelWidth / window.innerWidth;
      const phaseBDuration = lastCardWidth / window.innerWidth;
      const experienceTotalDuration = phaseADuration + phaseBDuration;
      const experience = document.querySelector("#experience");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-projects-wrapper",
          start: "top top",
          end: () =>
            `+=${window.innerWidth * (1 + step1Duration + barsDuration + experienceTotalDuration)}`,
          pin: true,
          scrub: 0.1,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      // Step 1: Slide #projects container into viewport
      tl.to("#projects", {
        x: "-100vw",
        ease: "none",
        duration: 1,
      });

      // Step 2: Slide projectsTrack until endPanel reaches its pinned position
      tl.to(projectsTrack, {
        x: endPanelTargetX,
        ease: "none",
        duration: step1Duration,
      });

      const cards = document.querySelectorAll("#projects .project-card");
      cards.forEach((card, index) => {
        const pTags = card.querySelectorAll(".project-meta-item");
        const titleEl = card.querySelector("h3");

        animateTextSlideUp(pTags, {
          trigger: card,
          containerAnimation: tl,
          start: `left ${80 - index * -10}%`,
          duration: 0.5,
          stagger: 0.1,
        });

        animateWaveText(titleEl, {
          trigger: card,
          containerAnimation: tl,
          start: `left ${80 - index * -10}%`,
          staggerEnter: 0.03,
          staggerExit: 0,
        });

        const btnIcon = card.querySelector(".project-btn-icon");
        gsap.set(btnIcon, { scale: 0, opacity: 0 });

        ScrollTrigger.create({
          trigger: card,
          containerAnimation: tl,
          start: `left ${80 - index * -10}%`,
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
      });

      // Step 3: Animate project list bars while endPanel & projectsTrack stay pinned in place
      const bars = document.querySelectorAll("#projects .project-list-bar");
      gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });

      tl.to(bars, {
        scaleX: 1,
        stagger: 0.15,
        ease: "none",
        duration: barsDuration,
      });

      // Step 4A: Slide experience section ON TOP of endPanel until touching the last project card
      if (experience) {
        tl.to(experience, {
          x: `-${endPanelWidth}px`,
          ease: "none",
          duration: phaseADuration,
        });
      }

      // Step 4B: Experience touches the last card; projectsTrack slides left by lastCardWidth
      if (lastCardWidth > 0) {
        tl.to(projectsTrack, {
          x: endPanelTargetX - lastCardWidth,
          ease: "none",
          duration: phaseBDuration,
        });
      }

      const headingEl = document.querySelector("#projects-end-panel .projects-heading");
      animateWaveText(headingEl, {
        trigger: endPanel || headingEl,
        containerAnimation: tl,
        start: "left right+=5%",
        staggerEnter: 0.04,
        staggerExit: 0,
      });

      const listItems = document.querySelectorAll("#projects .projects-list-item");
      animateTextSlideUp(listItems, {
        trigger: endPanel || listItems[0],
        containerAnimation: tl,
        start: "left right",
        duration: 0.5,
        stagger: 0.08,
      });

      const endTexts = document.querySelectorAll("#projects .projects-end-text");
      animateTextSlideUp(endTexts, {
        trigger: endPanel || endTexts[0],
        containerAnimation: tl,
        start: "left right-=5%",
        duration: 0.5,
        stagger: 0.08,
      });

      const endBtn = document.querySelector("#projects-end-panel .primary-button");
      animatePrimaryButtonIntro(endBtn, {
        containerAnimation: tl,
        start: "left right-=5%",
      });

      animateExperience(tl);
    });

    // ─── MOBILE & TABLET (< 1024px): Pinned Deck Upward Slide Sequence ──────────
    mm.add("(max-width: 1023px)", () => {
      const projectsSection = document.querySelector("#projects");
      if (!projectsSection) return;

      const cards = Array.from(document.querySelectorAll("#projects .project-card"));
      const endPanel = document.querySelector("#projects-end-panel");

      const panels = [...cards];
      if (endPanel) panels.push(endPanel);

      if (panels.length <= 1) return;

      // Set initial positions: Panel 0 is visible at 0%, all subsequent panels start below viewport
      panels.forEach((panel, idx) => {
        if (idx === 0) {
          gsap.set(panel, { yPercent: 0, scale: 1, opacity: 1 });
        } else {
          gsap.set(panel, { yPercent: 100, scale: 1, opacity: 1 });
        }
      });

      // Prepare project list bars
      const bars = document.querySelectorAll("#projects .project-list-bar");
      gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });

      // First card button icon pop-in on scroll enter
      const firstBtn = panels[0]?.querySelector(".project-btn-icon");
      if (firstBtn) {
        gsap.set(firstBtn, { scale: 0, opacity: 0 });
        ScrollTrigger.create({
          trigger: "#projects",
          start: "top 70%",
          onEnter: () => {
            gsap.to(firstBtn, {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(1.7)",
              overwrite: "auto",
            });
          },
        });
      }

      const stepDuration = 1;
      const holdDuration = 0.3;

      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#projects",
          start: "top top",
          end: () => `+=${(panels.length - 1) * window.innerHeight + window.innerHeight * holdDuration}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.4,
          invalidateOnRefresh: true,
          refreshPriority: 2,
        },
      });

      // Slide each subsequent panel upward to cover the previous panel
      for (let i = 1; i < panels.length; i++) {
        const currentPanel = panels[i];

        // Slide current panel up from 100% to 0%
        mobileTl.to(
          currentPanel,
          {
            yPercent: 0,
            ease: "none",
            duration: stepDuration,
          },
          `step-${i}`,
        );

        // If currentPanel is a project card, pop its button icon
        const btnIcon = currentPanel.querySelector(".project-btn-icon");
        if (btnIcon) {
          mobileTl.fromTo(
            btnIcon,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
            `step-${i}+=0.5`,
          );
        }

        // If currentPanel is end panel, animate its list bars
        if (currentPanel === endPanel && bars.length > 0) {
          mobileTl.to(
            bars,
            {
              scaleX: 1,
              stagger: 0.1,
              duration: 0.5,
              ease: "none",
            },
            `step-${i}+=0.3`,
          );
        }
      }

      // Hold on the final panel so the user can comfortably view it before unpinning
      mobileTl.to({}, { duration: holdDuration });
    });
  };

  return { animateProjects };
}
