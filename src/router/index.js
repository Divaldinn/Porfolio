import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import StatsView from '../views/StatsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView
    },
    {
      path: '/projects/:id',
      name: 'project-detail',
      component: () => import('../views/ProjectDetailView.vue')
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: to => {
        // If looking for a PDF/Image that is missing, go to Home but log warning
        if (to.path.includes('.pdf')) {
          console.warn("Missing PDF:", to.path);
          return '/';
        }
        return '/';
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  }
})

// Google Analytics Tracking Hook
router.afterEach((to) => {
  if (window.gtag) {
    window.gtag('config', 'G-MY7RGJHVLL', {
      page_path: to.path
    });
  }
})

export default router
