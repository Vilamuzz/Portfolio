import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/pages/ProjectPage.vue'),
    },
    {
      path: '/expertise',
      name: 'expertise',
      component: () => import('@/pages/ExpertisePage.vue'),
    },
    {
      path: '/experience',
      name: 'experience',
      component: () => import('@/pages/ExperiencePage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFoundPage.vue'),
    },
  ],
})

export default router
