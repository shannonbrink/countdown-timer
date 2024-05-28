import { createRouter, createWebHistory } from 'vue-router'
import TimerView from '../views/TimerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'timer',
      component: TimerView
    },
    {
      path: '/cat',
      name: 'cat',
      component: () => import('../views/CatView.vue')
    }
  ]
})

export default router
