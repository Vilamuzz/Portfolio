import gsap from 'gsap'
import { useTextAnimation } from './useTextAnimation'
import { useButtonAnimation } from './useButtonAnimation'

export function useExperienceAnimation() {
  const { animateTextSlideUp, animateWaveText } = useTextAnimation()
  const { animatePrimaryButtonIntro } = useButtonAnimation()

  const animateExperience = (tl) => {
    const experience = document.querySelector('#experience')
    if (!experience || !tl) return

    const imgContainer = experience.querySelector('#experience-img-container')
    const img = experience.querySelector('#experience-img-container img')
    const heading = experience.querySelector('h2')
    const subtext = experience.querySelector('.self-start p')
    const rightHeading = experience.querySelector('.self-end h3')
    const rightText = experience.querySelector('.self-end p')
    const primaryButton = experience.querySelector('.primary-button')

    if (imgContainer) {
      gsap.fromTo(
        imgContainer,
        { x: -150 },
        {
          x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: experience,
            containerAnimation: tl,
            scrub: true,
            start: 'left right',
            end: 'left left',
          },
        },
      )
    }

    if (img) {
      gsap.fromTo(
        img,
        { x: 300 },
        {
          x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: experience,
            containerAnimation: tl,
            scrub: true,
            start: 'left right',
            end: 'left left',
          },
        },
      )
    }

    if (heading) {
      animateWaveText(heading, {
        trigger: experience,
        containerAnimation: tl,
        start: 'left 5%',
        staggerEnter: 0.04,
        staggerExit: 0,
      })
    }

    if (subtext) {
      animateTextSlideUp(subtext, {
        trigger: experience,
        containerAnimation: tl,
        start: 'left 5%',
        duration: 0.5,
      })
    }

    if (rightHeading) {
      animateWaveText(rightHeading, {
        trigger: experience,
        containerAnimation: tl,
        start: 'left 5%',
        staggerEnter: 0.04,
        staggerExit: 0,
      })
    }

    if (rightText) {
      animateTextSlideUp(rightText, {
        trigger: experience,
        containerAnimation: tl,
        start: 'left 5%',
        duration: 0.5,
      })
    }

    if (primaryButton) {
      animatePrimaryButtonIntro(primaryButton, {
        trigger: experience,
        containerAnimation: tl,
        start: 'left 5%',
      })
    }
  }

  const animateExperienceTimeline = () => {
    const items = document.querySelectorAll('#experience-timeline .experience-item')
    if (!items.length) return

    // Set initial state — hidden below and invisible
    gsap.set(items, { y: 50, opacity: 0 })

    items.forEach((item) => {
      gsap.to(item, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    // Animate the image on each item separately for an elegant scale-down fade-in
    const imgs = document.querySelectorAll('#experience-timeline .experience-item img')
    gsap.set(imgs, { scale: 1.15, opacity: 0 })
    imgs.forEach((img) => {
      gsap.to(img, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      })
    })
    // Parallax animation for the Shuttle image
    const shuttle = document.querySelector("#experience-timeline img[alt='Shuttle']")
    if (shuttle) {
      gsap.fromTo(
        shuttle,
        { y: 300 },
        {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: '#experience-timeline',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }
  }

  return { animateExperience, animateExperienceTimeline }
}
