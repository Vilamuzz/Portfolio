import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useHeroAnimation() {
  const animateHero = () => {
    gsap.fromTo(
      ['.hero-title', '.hero-subtitle', '.hero-description'],
      { y: '100%' },
      { y: '0%', duration: 0.8, stagger: 0.2, ease: 'power2.out' },
    )

    gsap.fromTo(
      '#hero-cv-btn, #hero-card',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.7, stagger: 0.2, ease: 'power2.out' },
    )

    // Hide navbar initially when on hero section
    const navbar = document.querySelector('#navbar')
    if (!navbar) return

    gsap.set(navbar, { opacity: 0, y: -20, pointerEvents: 'none' })

    const mm = gsap.matchMedia()

    // Desktop: Show navbar once scrolled past hero
    mm.add('(min-width: 1024px)', () => {
      ScrollTrigger.create({
        trigger: '#projects',
        start: `top -=${window.innerWidth}px`,
        onEnter: () => {
          gsap.to(navbar, {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        },
        onLeaveBack: () => {
          gsap.to(navbar, {
            opacity: 0,
            y: -20,
            pointerEvents: 'none',
            duration: 0.3,
            ease: 'power2.in',
            overwrite: 'auto',
          })
        },
      })
    })

    // Mobile/Tablet: Show navbar once scrolling past hero section
    mm.add('(max-width: 1023px)', () => {
      ScrollTrigger.create({
        trigger: '#projects',
        start: 'top 40%',
        onEnter: () => {
          gsap.to(navbar, {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        },
        onLeaveBack: () => {
          gsap.to(navbar, {
            opacity: 0,
            y: -20,
            pointerEvents: 'none',
            duration: 0.3,
            ease: 'power2.in',
            overwrite: 'auto',
          })
        },
      })
    })
  }

  return { animateHero }
}

