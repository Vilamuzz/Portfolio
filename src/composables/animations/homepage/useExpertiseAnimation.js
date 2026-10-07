import gsap from "gsap";
import { useTextAnimation } from "../useTextAnimation";
import { useButtonAnimation } from "../useButtonAnimation";

export function useExpertiseAnimation() {
  const { animateTextSlideUp, animateWaveText } = useTextAnimation();
  const { animatePrimaryButtonIntro } = useButtonAnimation();

  const animateExpertise = () => {
    const expertiseSection = document.querySelector("#expertise");
    if (!expertiseSection) return;

    const mm = gsap.matchMedia();

    // Common: Wave heading animation
    const headingEl = document.querySelector("#expertise .expertise-heading");
    if (headingEl) {
      animateWaveText(headingEl, {
        trigger: "#expertise",
        start: "top 75%",
        staggerEnter: 0.04,
        staggerExit: 0,
      });
    }

    // ─── DESKTOP (≥ 1024px): Pinned Multi-Stage Clip-Path Sequence ──────────────
    mm.add("(min-width: 1024px)", () => {
      const items = document.querySelectorAll("#items .item");
      if (items.length < 2) return;

      const firstImg = items[0].querySelector(".image-container");
      const W = firstImg ? firstImg.offsetWidth : 420;
      const R = window.innerWidth * 0.2;
      const scaleFactor = 0.45;

      const getStageProps = (stage) => {
        return Array.from(items).map((item, i) => {
          if (i === stage) {
            return {
              x: 0,
              scale: 1,
              clipPath: "inset(0px 0px 0px 0px)",
              opacity: 1,
            };
          } else if (i > stage) {
            const k = i - stage;
            const scale = Math.pow(scaleFactor, k);

            let sumScale = 0;
            for (let j = stage; j < i; j++) {
              sumScale += Math.pow(scaleFactor, j - stage);
            }

            const x = W * ((1 + scale) / 2 + sumScale - 1);
            const visualLeft = R - W * (sumScale - 1);
            const clipVal = Math.max(0, window.innerWidth - visualLeft);

            return {
              x: x,
              scale: scale,
              clipPath: `inset(0px 0px 0px ${clipVal}px)`,
              opacity: 1,
            };
          } else {
            const k = stage - i;
            return {
              x: -120 * k,
              scale: Math.pow(0.8, k),
              clipPath: "inset(0px 0px 0px 0px)",
              opacity: k === 1 ? 0.5 : 0,
            };
          }
        });
      };

      // Intro animations for Card 0
      const firstTitle = items[0].querySelectorAll(".expertise-item-title");
      const firstSkills = items[0].querySelectorAll(".expertise-item-skill");
      if (firstTitle.length > 0) {
        animateTextSlideUp(firstTitle, {
          trigger: "#expertise",
          start: "top 40%",
          duration: 0.5,
        });
      }
      if (firstSkills.length > 0) {
        animateTextSlideUp(firstSkills, {
          trigger: "#expertise",
          start: "top 40%",
          duration: 0.5,
          stagger: 0.05,
        });
      }

      const firstPrimaryBtn = items[0].querySelector(".primary-button");
      if (firstPrimaryBtn) {
        animatePrimaryButtonIntro(firstPrimaryBtn, {
          trigger: "#expertise",
          start: "top 40%",
        });
      }

      // Initial stage 0 placement
      const initialProps = getStageProps(0);
      items.forEach((item, i) => {
        const img = item.querySelector(".image-container");
        const props = initialProps[i];

        gsap.set(item, { clipPath: props.clipPath });
        if (img) {
          gsap.set(img, { x: props.x, scale: props.scale, opacity: props.opacity });
        }
      });

      // Pinned scrolling timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#expertise",
          start: "top top",
          end: `+=${(items.length - 1) * 120}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      for (let s = 0; s < items.length - 1; s++) {
        const nextProps = getStageProps(s + 1);

        items.forEach((item, i) => {
          const img = item.querySelector(".image-container");
          const props = nextProps[i];

          tl.to(
            item,
            {
              clipPath: props.clipPath,
              ease: "none",
              duration: 1,
            },
            s,
          );

          if (img) {
            tl.to(
              img,
              {
                x: props.x,
                scale: props.scale,
                opacity: props.opacity,
                ease: "none",
                duration: 1,
              },
              s,
            );
          }
        });
      }
    });

    // ─── MOBILE & TABLET (< 1024px): Responsive Cards Stagger Sequence ─────────
    mm.add("(max-width: 1023px)", () => {
      const mobileCards = document.querySelectorAll(".mobile-expertise-card");
      mobileCards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          },
        );
      });
    });
  };

  return { animateExpertise };
}
