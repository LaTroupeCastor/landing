import { defineStore } from 'pinia'
import { supabase } from '../supabase_client'

interface User {
  id: string
  email: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    isLoading: false
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  
  actions: {
    setUser(user: User | null) {
      this.user = user
    },
    
    setLoading(loading: boolean) {
      this.isLoading = loading
    },
    
    async logout() {
      await supabase.auth.signOut()
      this.user = null
    },

    async checkUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          this.setUser({
            id: user.id,
            email: user.email || ''
          })
        } else {
          this.setUser(null)
        }
      } catch (error) {
        console.error('Error checking user:', error)
        this.setUser(null)
      }
    }
  }
})
