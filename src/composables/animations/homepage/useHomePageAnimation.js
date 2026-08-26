import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/composables/useLenis";

import { useHeroAnimation } from "./useHeroAnimation";
import { useProjectAnimation } from "./useProjectAnimation";
import { useExpertiseAnimation } from "./useExpertiseAnimation";
import { useExperienceAnimation } from "./useExperienceAnimation";
import { useContactAnimation } from "./useContactAnimation";
import { useButtonAnimation } from "../useButtonAnimation";

export function useHomePageAnimation(containerRef) {
  const { animateHero } = useHeroAnimation();
  const { animateProjects } = useProjectAnimation();
  const { animateExpertise } = useExpertiseAnimation();
  const { animateExperienceTimeline } = useExperienceAnimation();
  const { animateContact } = useContactAnimation();
  const {
    animateHeroButtonHover,
    animateHeroButtonHoverOut,
    animateProjectCardHover,
    animateProjectCardHoverOut,
    animatePrimaryButtonHover,
    animatePrimaryButtonHoverOut,
  } = useButtonAnimation();

  let ctx;

  onMounted(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    const { lenis } = useLenis();
    if (lenis) lenis.on("scroll", ScrollTrigger.update);

    ctx = gsap.context(() => {
      animateHero();
      animateProjects();
      animateExpertise();
      animateExperienceTimeline();
      animateContact();
    }, containerRef?.value);
  });

  onUnmounted(() => {
    ctx?.revert();
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
