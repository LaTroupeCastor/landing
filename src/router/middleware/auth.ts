import { useUserStore } from '../../store/userStore'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const authMiddleware = async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStore = useUserStore()

  // Vérifier l'état de l'utilisateur à chaque navigation
  await userStore.checkUser()

  if (!userStore.isAuthenticated && to.meta.requiresAuth) {
    next({ name: 'auth' })
    return
  }

  if (userStore.isAuthenticated && to.name === 'auth') {
    next({ name: 'client-space' })
    return
  }

  next()
}
