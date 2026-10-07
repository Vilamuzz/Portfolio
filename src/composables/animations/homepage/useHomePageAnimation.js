import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/composables/useLenis";

import { useHeroAnimation } from "./useHeroAnimation";
import { useProjectAnimation } from "./useProjectAnimation";
import { useExpertiseAnimation } from "./useExpertiseAnimation";
import { useExperienceAnimation } from "./useExperienceAnimation";
import { useButtonAnimation } from "../useButtonAnimation";

export function useHomePageAnimation(containerRef) {
  const { animateHero } = useHeroAnimation();
  const { animateProjects } = useProjectAnimation();
  const { animateExpertise } = useExpertiseAnimation();
  const { animateExperienceTimeline } = useExperienceAnimation();
  const {
    animateHeroButtonHover,
    animateHeroButtonHoverOut,
    animateProjectCardHover,
    animateProjectCardHoverOut,
    animatePrimaryButtonHover,
    animatePrimaryButtonHoverOut,
  } = useButtonAnimation();

  let ctx;
  let onRefreshHandler;
  let resizeTimer;

  onMounted(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    const { lenis } = useLenis();

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);

      // Keep Lenis's internal scroll limit in sync with ScrollTrigger pin spacers
      onRefreshHandler = () => {
        lenis.resize();
      };
      ScrollTrigger.addEventListener("refresh", onRefreshHandler);
    }

    ctx = gsap.context(() => {
      animateHero();
      animateProjects();
      animateExperienceTimeline();
      animateExpertise();
    }, containerRef?.value);

    // Refresh ScrollTrigger and sync Lenis scroll dimensions
    ScrollTrigger.refresh();
    if (lenis) {
      lenis.resize();
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        lenis.resize();
      }, 150);
    }
  });

  onUnmounted(() => {
    if (resizeTimer) clearTimeout(resizeTimer);
    if (onRefreshHandler) {
      ScrollTrigger.removeEventListener("refresh", onRefreshHandler);
    }
    ctx?.revert();
    const { lenis } = useLenis();
    if (lenis) {
      lenis.resize();
    }
  });

  return {
    animateHeroButtonHover,
    animateHeroButtonHoverOut,
    animateProjectCardHover,
    animateProjectCardHoverOut,
    animatePrimaryButtonHover,
    animatePrimaryButtonHoverOut,
  };
}
