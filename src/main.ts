// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import VueGtm from 'vue-gtm'
import './style/style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Ajout de Google Tag Manager
app.use(VueGtm, {
  id: 'GTM-KVNNQGLJ', 
  vueRouter: router, // Active le suivi des pages via Vue Router
  enabled: true, // Active GTM (à desactiver en mode développement si besoin)
  debug: false, // Passer à true pour voir les logs en console
  loadScript: true, // Charge automatiquement le script GTM
})

app.mount('#app')
