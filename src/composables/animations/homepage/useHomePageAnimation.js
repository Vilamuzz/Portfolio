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
  let onAssetLoad;
  let resizeTimer;

  onMounted(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    const { lenis } = useLenis();

    if (lenis) {
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

    // Initial refresh
    ScrollTrigger.refresh();
    lenis?.resize();

    // Recalculate ScrollTrigger markers and Lenis scroll limits once all images finish loading
    onAssetLoad = () => {
      ScrollTrigger.refresh();
      lenis?.resize();
    };

    if (document.readyState === "complete") {
      onAssetLoad();
    } else {
      window.addEventListener("load", onAssetLoad, { once: true });
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
        lenis?.resize();
      });
    }

    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      lenis?.resize();
    }, 200);
  });

  onUnmounted(() => {
    if (resizeTimer) clearTimeout(resizeTimer);
    if (onAssetLoad) {
      window.removeEventListener("load", onAssetLoad);
    }
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
