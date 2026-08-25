import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

export function useTextAnimation() {
  const animateTextSlideUp = (targets, options = {}) => {
    const {
      trigger = null,
      containerAnimation = null,
      start = 'top 85%',
      duration = 0.5,
      stagger = 0.1,
      ease = 'power2.out',
      toggleActions = 'play none none reverse',
    } = options

    if (!targets || (targets.length !== undefined && targets.length === 0)) return

    const split = SplitText.create(targets, { type: 'lines', mask: 'lines' })
    if (!split.lines.length) return

    const scrollTriggerConfig = {
      trigger: trigger || split.lines[0],
      start,
      toggleActions,
    }

    if (containerAnimation) {
      scrollTriggerConfig.containerAnimation = containerAnimation
    }

    return gsap.fromTo(
      split.lines,
      { y: '120%' },
      {
        y: '0%',
        duration,
        stagger,
        ease,
        scrollTrigger: scrollTriggerConfig,
      },
    )
  }

  const animateWaveText = (targets, options = {}) => {
    const {
      trigger = null,
      containerAnimation = null,
      start = 'top 80%',
      durationEnter = 0.5,
      durationExit = 0.4,
      staggerEnter = 0.03,
      staggerExit = 0,
      easeEnter = 'power2.out',
      easeExit = 'power2.in',
    } = options

    if (!targets || (targets.length !== undefined && targets.length === 0)) return

    const split = SplitText.create(targets, { type: 'chars', mask: 'chars' })
    if (!split.chars.length) return

    const actualTrigger = trigger || split.chars[0]

    const scrollTriggerConfig = {
      trigger: actualTrigger,
      start,
      onEnter: () => {
        gsap.killTweensOf(split.chars)
        gsap.to(split.chars, {
          y: '0%',
          duration: durationEnter,
          stagger: staggerEnter,
          ease: easeEnter,
        })
      },
      onLeaveBack: () => {
        gsap.killTweensOf(split.chars)
        gsap.to(split.chars, {
          y: '120%',
          duration: durationExit,
          stagger: staggerExit,
          ease: easeExit,
        })
      },
    }

    if (containerAnimation) {
      scrollTriggerConfig.containerAnimation = containerAnimation
    }

    return gsap.fromTo(
      split.chars,
      { y: '120%' },
      {
        y: '0%',
        duration: durationEnter,
        stagger: staggerEnter,
        ease: easeEnter,
        scrollTrigger: scrollTriggerConfig,
      },
    )
  }

  return {
    animateTextSlideUp,
    animateWaveText,
  }
}
