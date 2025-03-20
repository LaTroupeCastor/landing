import { useUserStore } from '../../store/userStore'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const authMiddleware = async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStore = useUserStore()
  
  await userStore.checkUser()

  // Redirection pour les routes protégées
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: 'login' })
    return
  }

  // Redirection pour les routes réservées aux visiteurs non connectés
  if (to.meta.requiresGuest && userStore.isAuthenticated) {
    next({ name: 'client-space' })
    return
  }

  next()
}
