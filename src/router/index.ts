import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/aides-et-primes',
      name: 'aids',
      component: () => import('../views/Aids.vue')
    },
    {
      path: '/notre-equipe',
      name: 'team',
      component: () => import('../views/Team.vue')
    },
    {
      path: '/espace-client',
      name: 'client-space',
      component: () => import('../views/ClientSpace.vue')
    },
    {
      path: '/simulation',
      name: 'simulation',
      component: () => import('../views/Simulation.vue')
    }
  ]
})

export default router
