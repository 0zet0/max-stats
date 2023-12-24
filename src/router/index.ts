import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/home-page.vue')
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import('@/pages/stats-page.vue')
  },
  {
    path: '/stats-ml',
    name: 'StatsMl',
    component: () => import('@/pages/stats-ml-page.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
