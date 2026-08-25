<template>
  <main
    class="relative min-h-screen w-screen bg-brand-black overflow-hidden flex flex-col items-center justify-center"
  >
    <!-- Background glitch number -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <span
        class="glitch-bg text-[28vw] font-black text-white/[0.03] leading-none tracking-tighter"
        data-text="404"
        >404</span
      >
    </div>

    <!-- Noise grain overlay -->
    <div class="absolute inset-0 grain opacity-[0.04] pointer-events-none"></div>

    <!-- Main content -->
    <div class="relative z-10 flex flex-col items-center text-center px-8 gap-8">
      <!-- Animated 404 label -->
      <div class="overflow-hidden">
        <p
          ref="errorCodeRef"
          class="text-primary text-sm font-bold uppercase tracking-[0.3em] translate-y-full"
        >
          Error 404
        </p>
      </div>

      <!-- Headline -->
      <div class="overflow-hidden">
        <h1
          ref="headlineRef"
          class="text-5xl md:text-7xl font-extrabold text-white leading-tight translate-y-full"
        >
          Page not found
        </h1>
      </div>

      <!-- Subtext -->
      <div class="overflow-hidden">
        <p ref="subtextRef" class="text-white/40 text-lg max-w-md leading-relaxed translate-y-full">
          Looks like this page took a wrong turn.<br />
          Let's get you back on track.
        </p>
      </div>

      <!-- CTA Button -->
      <div ref="btnRef" class="opacity-0 translate-y-4">
        <RouterLink
          to="/"
          class="group inline-flex items-center gap-3 bg-primary text-brand-black font-bold px-8 py-4 rounded-full text-sm hover:bg-white transition-colors duration-300"
        >
          <span>Back to Home</span>
          <span
            class="size-6 rounded-full bg-brand-black text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-brand-black transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </span>
        </RouterLink>
      </div>
    </div>

    <!-- Drifting particles -->
    <canvas
      ref="particleCanvas"
      class="absolute inset-0 w-full h-full pointer-events-none"
    ></canvas>
  </main>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'

const errorCodeRef = ref(null)
const headlineRef = ref(null)
const subtextRef = ref(null)
const btnRef = ref(null)
const particleCanvas = ref(null)

let animCtx = null
let particleAnimId = null

// ─── Entrance Animations ─────────────────────────────────────────────────────
onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.to(errorCodeRef.value, { y: '0%', duration: 0.7 })
    .to(headlineRef.value, { y: '0%', duration: 0.8 }, '-=0.45')
    .to(subtextRef.value, { y: '0%', duration: 0.8 }, '-=0.5')
    .to(btnRef.value, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')

  initParticles()
})

onBeforeUnmount(() => {
  if (particleAnimId) cancelAnimationFrame(particleAnimId)
})

// ─── Floating Particles ───────────────────────────────────────────────────────
function initParticles() {
  const canvas = particleCanvas.value
  if (!canvas) return

  animCtx = canvas.getContext('2d')

  const resize = () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }

  resize()
  window.addEventListener('resize', resize)

  const COUNT = 60
  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.4 + 0.1,
  }))

  const draw = () => {
    animCtx.clearRect(0, 0, canvas.width, canvas.height)
    for (const p of particles) {
      animCtx.beginPath()
      animCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      animCtx.fillStyle = `rgba(255,255,255,${p.alpha})`
      animCtx.fill()
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0
    }
    particleAnimId = requestAnimationFrame(draw)
  }

  draw()
}
</script>

<style scoped>
/* Grain texture via CSS */
.grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}

/* Subtle glitch text shadow loop */
.glitch-bg {
  animation: glitch 6s infinite step-start;
}

@keyframes glitch {
  0%,
  90%,
  100% {
    text-shadow: none;
  }
  92% {
    text-shadow: -4px 0 rgba(100, 217, 140, 0.25);
  }
  94% {
    text-shadow: 4px 0 rgba(255, 80, 80, 0.2);
  }
  96% {
    text-shadow: none;
  }
}
</style>
