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

// ── Module-level singleton ────────────────────────────────────────────────────
let lenis = null
let rafId = null

// ── RAF loop ──────────────────────────────────────────────────────────────────
function startRaf() {
  const tick = (time) => {
    lenis?.raf(time)
    rafId = requestAnimationFrame(tick)
  }
  rafId = requestAnimationFrame(tick)
}

function stopRaf() {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
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
    duration: 1.5,
    lerp: 0.05,
    wheelMultiplier: 1.5,
    infinite: false,
    ...options,
  })

  startRaf()
  return lenis
}

/**
 * Destroy the Lenis instance. Call from App.vue onUnmounted.
 * This is the only place it should be torn down.
 */
export function destroyLenis() {
  stopRaf()
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}

/**
 * Composable used by any page / composable that needs the Lenis instance.
 * Returns the live instance (or null if initLenis hasn't been called yet).
 */
export function useLenis() {
  return {
    lenis,
    scrollToTop: () => lenis?.scrollTo(0, { immediate: true }),
  }
}
