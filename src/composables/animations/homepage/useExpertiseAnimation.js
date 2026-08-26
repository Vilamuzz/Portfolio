import gsap from "gsap";
import { useTextAnimation } from "../useTextAnimation";
import { useButtonAnimation } from "../useButtonAnimation";

export function useExpertiseAnimation() {
  const { animateTextSlideUp, animateWaveText } = useTextAnimation();
  const { animatePrimaryButtonIntro } = useButtonAnimation();

  const animateExpertise = () => {
    const items = document.querySelectorAll("#items .item");
    if (items.length < 2) return;

    // Dynamic measurements
    const firstImg = items[0].querySelector(".image-container");
    const W = firstImg ? firstImg.offsetWidth : 420; // width of image container (default 420px)

    // R is exactly 20% of the screen width (right-1/5). We calculate it directly to avoid
    // getBoundingClientRect returning 0 on page load before rendering is fully complete.
    const R = window.innerWidth * 0.2;

    // Scale factors
    const scaleFactor = 0.45; // Each queued item shrinks by this ratio

    // Helper to calculate positions and clipPaths for all items at a specific stage (active card index)
    const getStageProps = (stage) => {
      return Array.from(items).map((item, i) => {
        if (i === stage) {
          // Active item
          return {
            x: 0,
            scale: 1,
            clipPath: "inset(0px 0px 0px 0px)",
            opacity: 1,
          };
        } else if (i > stage) {
          // Queued item (to the right of active card)
          const k = i - stage;
          const scale = Math.pow(scaleFactor, k);

          let sumScale = 0;
          for (let j = stage; j < i; j++) {
            const j_scale = Math.pow(scaleFactor, j - stage);
            sumScale += j_scale;
          }

          // x initial offset to position it touching the right edge of the previous visual item
          const x = W * ((1 + scale) / 2 + sumScale - 1);

          // Left edge coordinate of this item's visual frame from the right of the screen
          const visualLeft = R - W * (sumScale - 1);

          // Left inset boundary for the clipping path
          const clipVal = Math.max(0, window.innerWidth - visualLeft);

          return {
            x: x,
            scale: scale,
            clipPath: `inset(0px 0px 0px ${clipVal}px)`,
            opacity: 1,
          };
        } else {
          // Pushed item (to the left of active card)
          const k = stage - i;
          return {
            x: -120 * k,
            scale: Math.pow(0.8, k),
            clipPath: "inset(0px 0px 0px 0px)",
            opacity: k === 1 ? 0.5 : 0, // Fades out if pushed more than 1 step
          };
        }
      });
    };

    // 1. Wave animation for Expertise section heading
    const headingEl = document.querySelector("#expertise .expertise-heading");
    if (headingEl) {
      animateWaveText(headingEl, {
        trigger: "#expertise",
        start: "top 70%",
        staggerEnter: 0.04,
        staggerExit: 0,
      });
    }

    // 2. Trigger slide-up animations ONLY for the first expertise item (Card 0)
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

    // Trigger primary button intro animation for Card 0
    const firstPrimaryBtn = items[0].querySelector(".primary-button");
    if (firstPrimaryBtn) {
      animatePrimaryButtonIntro(firstPrimaryBtn, {
        trigger: "#expertise",
        start: "top 40%",
      });
    }

    // 3. Set initial stage 0 clip-path and image positions
    const initialProps = getStageProps(0);
    items.forEach((item, i) => {
      const img = item.querySelector(".image-container");
      const props = initialProps[i];

      // Clip the parent container directly so the browser handles click pass-through natively
      gsap.set(item, { clipPath: props.clipPath });

      if (img) {
        gsap.set(img, { x: props.x, scale: props.scale, opacity: props.opacity });
      }
    });

    // 4. Timeline for pinned scrolling sequence
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

    // Dynamically build transitions between stages on timeline tl
    for (let s = 0; s < items.length - 1; s++) {
      const nextProps = getStageProps(s + 1);

      items.forEach((item, i) => {
        const img = item.querySelector(".image-container");
        const props = nextProps[i];

        // Animate parent clipPath directly
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
  };

  return { animateExpertise };
}
