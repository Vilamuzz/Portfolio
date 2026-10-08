/**
 * useLenis — global singleton smooth-scroll composable.
 *
 * The Lenis instance, rAF handle, and config live at MODULE scope,
 * so they are shared across every component that imports this file.
 * Only one Lenis instance ever exists for the lifetime of the SPA.
 *
 * Usage:
 *   App.vue   → call initLenis() on mount, destroyLenis() on unmount.
 *   Anywhere  → call useLenis() to get { lenis, scrollToTop }.
 */
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ── Module-level singleton ────────────────────────────────────────────────────
let lenis = null
let tickerCallback = null

// ── GSAP Ticker loop ──────────────────────────────────────────────────────────
function startTicker() {
  if (tickerCallback) return
  tickerCallback = (time) => {
    lenis?.raf(time * 1000)
  }
  gsap.ticker.add(tickerCallback)
  gsap.ticker.lagSmoothing(0)
}

function stopTicker() {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback)
    tickerCallback = null
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Initialize the global Lenis instance. Call once from App.vue onMounted.
 * Safe to call multiple times — will not create a second instance.
 */
export function initLenis(options = {}) {
  if (lenis) return lenis

  lenis = new Lenis({
    duration: 1.2,
    lerp: 0.08,
    wheelMultiplier: 1.2,
    infinite: false,
    autoResize: true,
    ...options,
  })

  lenis.on('scroll', ScrollTrigger.update)
  startTicker()
  return lenis
}

/**
 * Destroy the Lenis instance. Call from App.vue onUnmounted.
 * This is the only place it should be torn down.
 */
export function destroyLenis() {
  stopTicker()
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}

/**
 * Composable used by any page / composable that needs the Lenis instance.
 * Returns the live instance, safely creating it if called before App.vue onMounted.
 */
export function useLenis() {
  const instance = lenis ?? (typeof window !== 'undefined' ? initLenis() : null)
  return {
    lenis: instance,
    scrollToTop: () => instance?.scrollTo(0, { immediate: true }),
    resizeLenis: () => instance?.resize(),
  }
}
