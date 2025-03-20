import { createRouter, createWebHistory } from 'vue-router'
import { authMiddleware } from './middleware/auth'

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
      component: () => import('../views/ClientSpace.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/connexion',
      name: 'login',
      component: () => import('../components/Auth.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/inscription',
      name: 'signup',
      component: () => import('../components/Auth.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/simulation',
      name: 'simulation',
      component: () => import('../views/Simulation.vue')
    }
  ]
})

router.beforeEach(authMiddleware)

export default router
