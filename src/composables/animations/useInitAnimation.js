import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/composables/useLenis";
import { useHeroAnimation } from "@/composables/animations/useHeroAnimation";
import { useButtonAnimation } from "@/composables/animations/useButtonAnimation";
import { useExpertiseAnimation } from "@/composables/animations/useExpertiseAnimation";
import { useProjectAnimation } from "@/composables/animations/useProjectAnimation";
import { useExperienceAnimation } from "@/composables/animations/useExperienceAnimation";

export function useInitAnimation() {
  const { animateHero } = useHeroAnimation();
  const buttonAnimations = useButtonAnimation();
  const { animateExpertise } = useExpertiseAnimation();
  const { animateProjects } = useProjectAnimation();
  const { animateExperienceTimeline } = useExperienceAnimation();

  let ctx = null;

  const initAnimations = () => {
    animateHero();
    animateProjects();
    animateExpertise();
    animateExperienceTimeline();
  };

  onMounted(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    // Wire the global Lenis singleton to ScrollTrigger
    const { lenis } = useLenis();
    if (lenis) lenis.on("scroll", ScrollTrigger.update);

    ctx = gsap.context(() => {
      initAnimations();
    });
  });

  onUnmounted(() => {
    // Only revert GSAP context — Lenis outlives this component
    if (ctx) ctx.revert();
  });

  return {
    ...buttonAnimations,
  };
}

export const initAnimation = useInitAnimation;
