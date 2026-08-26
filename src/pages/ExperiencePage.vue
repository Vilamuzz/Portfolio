<script setup>
import { ref } from "vue";
import experienceData from "@/data/experienceData.json";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useExperiencePageAnimation } from "@/composables/animations/useExperiencePageAnimation";
import { Briefcase, Trophy, Calendar, MapPin, ShieldCheck, ArrowUpRight } from "@lucide/vue";

const containerRef = ref(null);

// Data destructuring
const { workExperiences, certificates, achievements } = experienceData;

// Initialize GSAP scroll & entrance animations
useExperiencePageAnimation(containerRef);
</script>

<template>
  <div
    ref="containerRef"
    class="min-h-screen w-full bg-brand-black text-white font-sans selection:bg-white selection:text-brand-black"
  >
    <!-- Header / Navigation -->
    <AppHeader />

    <!-- Main Container -->
    <main class="max-w-7xl mx-auto px-6 sm:px-10 pt-32 pb-20 space-y-24">
      <!-- ─── HERO HEADER ──────────────────────────────────────────────── -->
      <section class="experience-header-content space-y-6 pt-6 border-b border-white/10 pb-12">
        <h1 class="text-5xl sm:text-7xl font-extrabold tracking-tight text-white">
          Experience & <br class="hidden sm:block" />
          <span class="text-white/40">Achievements.</span>
        </h1>

        <p class="text-lg sm:text-xl text-white/70 font-normal max-w-3xl leading-relaxed">
          A dedicated chronicle of my professional work experience, software engineering
          internships, industry certifications, and competition achievements.
        </p>
      </section>

      <!-- ─── DEDICATED SECTION 1: WORK & INTERNSHIP EXPERIENCE ────────── -->
      <section id="work-experience-section" class="space-y-10 scroll-mt-28">
        <div
          class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6"
        >
          <div class="space-y-2">
            <h2 class="text-3xl sm:text-4xl font-bold text-white">Work & Internship Experience</h2>
          </div>
        </div>

        <!-- Work Experience Timeline / Cards -->
        <div class="space-y-8">
          <div
            v-for="exp in workExperiences"
            :key="exp.id"
            class="experience-card group p-8 sm:p-10 border border-white/10 hover:border-primary transition-all duration-300 flex flex-col md:flex-row justify-between gap-8"
          >
            <!-- Left Header / Logo & Period -->
            <div class="md:w-1/3 space-y-4">
              <div class="flex items-center gap-4">
                <div
                  class="size-14 rounded-xl overflow-hidden bg-brand-navy border border-white/10 shrink-0 flex items-center justify-center"
                >
                  <img
                    v-if="exp.logo"
                    :src="exp.logo"
                    :alt="exp.company"
                    class="w-full h-full object-cover"
                  />
                  <Briefcase v-else class="size-6 text-white/40" />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white group-hover:text-white transition-colors">
                    {{ exp.company }}
                  </h3>
                  <div
                    class="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-mono text-white/80"
                  >
                    {{ exp.type }}
                  </div>
                </div>
              </div>

              <div class="space-y-1.5 text-xs font-mono text-white/50 pt-2">
                <div class="flex items-center gap-2">
                  <Calendar class="size-3.5 text-white/40" />
                  <span>{{ exp.period }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <MapPin class="size-3.5 text-white/40" />
                  <span>{{ exp.location }}</span>
                </div>
              </div>
            </div>

            <!-- Right Body / Details -->
            <div class="md:w-2/3 space-y-6 flex flex-col justify-between">
              <div class="space-y-3">
                <h4 class="text-2xl font-bold text-white">{{ exp.role }}</h4>
                <p class="text-white/70 leading-relaxed text-sm sm:text-base">
                  {{ exp.description }}
                </p>
              </div>

              <!-- Tech Stack Skills -->
              <div class="pt-4 border-t border-white/5">
                <span class="text-xs font-mono text-white/40 block mb-3 uppercase tracking-wider">
                  Technologies & Skills
                </span>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in exp.skills"
                    :key="skill"
                    class="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 text-xs font-mono text-white/80 border border-white/10 transition-colors"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── DEDICATED SECTION 2: CERTIFICATIONS ──────────────────────── -->
      <section id="certificates-section" class="space-y-10 scroll-mt-28">
        <div
          class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6"
        >
          <div class="space-y-2">
            <h2 class="text-3xl sm:text-4xl font-bold text-white">Certifications & Licenses</h2>
          </div>
        </div>

        <!-- Certificates Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="cert in certificates"
            :key="cert.id"
            class="certificate-card group p-8 border border-white/10 hover:border-primary transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div class="space-y-4">
              <div class="flex items-start justify-between gap-4">
                <div
                  class="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0"
                >
                  <ShieldCheck class="size-6 text-white" />
                </div>
                <a
                  v-if="cert.link"
                  :href="cert.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2 rounded-full bg-white/5 hover:bg-white text-white/60 hover:text-black transition-all duration-300"
                  title="Verify Credential"
                >
                  <ArrowUpRight class="size-4" />
                </a>
              </div>

              <div class="space-y-2">
                <h3
                  class="text-xl font-bold text-white group-hover:text-white transition-colors leading-snug"
                >
                  {{ cert.title }}
                </h3>
                <div class="flex items-center gap-3 text-xs font-mono text-white/60">
                  <span class="font-semibold text-white/80">{{ cert.issuer }}</span>
                  <span>•</span>
                  <span>Issued {{ cert.issueDate }}</span>
                </div>
              </div>

              <p v-if="cert.credentialId" class="text-xs font-mono text-white/40">
                Credential ID: <span class="text-white/60">{{ cert.credentialId }}</span>
              </p>
            </div>

            <!-- Skills Validated -->
            <div class="pt-4 border-t border-white/5">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="skill in cert.skills"
                  :key="skill"
                  class="px-2.5 py-1 rounded bg-white/5 text-xs font-mono text-white/70 border border-white/5"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── DEDICATED SECTION 3: ACHIEVEMENTS & AWARDS ────────────────── -->
      <section id="achievements-section" class="space-y-10 scroll-mt-28">
        <div
          class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6"
        >
          <div class="space-y-2">
            <h2 class="text-3xl sm:text-4xl font-bold text-white">Achievements & Competitions</h2>
          </div>
        </div>

        <!-- Achievements Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="achieve in achievements"
            :key="achieve.id"
            class="achievement-card group p-8 border border-white/10 hover:border-primary transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div
                  class="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
                >
                  <Trophy class="size-6 text-white" />
                </div>
                <span
                  class="px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold text-white border border-white/20"
                >
                  {{ achieve.award }}
                </span>
              </div>

              <div class="space-y-1">
                <h3
                  class="text-xl font-bold text-white group-hover:text-white transition-colors leading-snug"
                >
                  {{ achieve.title }}
                </h3>
                <p class="text-xs font-mono text-white/50">
                  {{ achieve.organization }} • {{ achieve.year }}
                </p>
              </div>

              <p class="text-sm text-white/70 leading-relaxed">
                {{ achieve.description }}
              </p>
            </div>

            <!-- Tags -->
            <div class="pt-4 border-t border-white/5 flex flex-wrap gap-2">
              <span
                v-for="tag in achieve.tags"
                :key="tag"
                class="px-2.5 py-1 rounded bg-white/5 text-xs font-mono text-white/60 border border-white/5"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Navigation Footer -->
    <AppFooter />
  </div>
</template>
