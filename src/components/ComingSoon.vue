<template>
  <main
    class="relative min-h-screen w-screen bg-brand-black overflow-hidden flex flex-col items-center justify-center"
  >
    <!-- Background label -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <span
        class="text-[20vw] font-black text-white/[0.025] leading-none tracking-tighter uppercase"
      >
        {{ label }}
      </span>
    </div>

    <!-- Grain overlay -->
    <div class="absolute inset-0 grain opacity-[0.04] pointer-events-none"></div>

    <!-- Progress bar -->
    <div class="absolute top-0 left-0 h-[2px] w-full bg-white/10">
      <div
        ref="progressBar"
        class="h-full bg-primary origin-left scale-x-0"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>

    <!-- Nav back -->
    <div ref="navRef" class="absolute top-8 left-10 opacity-0">
      <RouterLink
        to="/"
        class="group flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium transition-colors duration-300"
      >
        <span class="group-hover:-translate-x-1 transition-transform duration-300">←</span>
        <span>Back to Home</span>
      </RouterLink>
    </div>

    <!-- Main content -->
    <div class="relative z-10 flex flex-col items-center text-center px-8 gap-6">
      <!-- Section tag -->
      <div class="overflow-hidden">
        <p
          ref="tagRef"
          class="text-primary text-xs font-bold uppercase tracking-[0.35em] translate-y-full"
        >
          {{ tag }}
        </p>
      </div>

      <!-- Headline -->
      <div class="overflow-hidden">
        <h1
          ref="headlineRef"
          class="text-5xl md:text-7xl font-extrabold text-white leading-tight translate-y-full"
        >
          Coming Soon
        </h1>
      </div>

      <!-- Subtext -->
      <div class="overflow-hidden">
        <p
          ref="subtextRef"
          class="text-white/40 text-base max-w-sm leading-relaxed translate-y-full"
        >
          {{ description }}
        </p>
      </div>

      <!-- Animated dots -->
      <div ref="dotsRef" class="flex gap-2 mt-2 opacity-0">
        <span
          v-for="i in 3"
          :key="i"
          class="size-1.5 rounded-full bg-primary"
          :style="{ animationDelay: `${(i - 1) * 0.25}s` }"
          :class="'dot-pulse'"
        ></span>
      </div>
    </div>

    <!-- Particle canvas -->
    <canvas
      ref="particleCanvas"
      class="absolute inset-0 w-full h-full pointer-events-none"
    ></canvas>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

defineProps({
  label: { type: String, default: 'Soon' },
  tag: { type: String, default: 'Page' },
  description: { type: String, default: 'This page is under construction. Check back later.' },
})

const tagRef = ref(null)
const headlineRef = ref(null)
const subtextRef = ref(null)
const dotsRef = ref(null)
const navRef = ref(null)
const progressBar = ref(null)
const particleCanvas = ref(null)
let particleAnimId = null

onMounted(() => {
  // Entrance animation
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.to(navRef.value, { opacity: 1, duration: 0.5 })
    .to(tagRef.value, { y: '0%', duration: 0.6 }, '-=0.3')
    .to(headlineRef.value, { y: '0%', duration: 0.8 }, '-=0.45')
    .to(subtextRef.value, { y: '0%', duration: 0.7 }, '-=0.5')
    .to(dotsRef.value, { opacity: 1, duration: 0.5 }, '-=0.4')

  // Progress bar subtle idle animation
  gsap.fromTo(
    progressBar.value,
    { scaleX: 0 },
    { scaleX: 0.65, duration: 2.5, ease: 'power1.out', delay: 0.6 },
  )

  initParticles()
})

onBeforeUnmount(() => {
  if (particleAnimId) cancelAnimationFrame(particleAnimId)
})

function initParticles() {
  const canvas = particleCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  const resize = () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2 + 0.3,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    alpha: Math.random() * 0.35 + 0.05,
  }))

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const p of particles) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`
      ctx.fill()
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
.grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}

.dot-pulse {
  animation: pulse 1.2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}
</style>
