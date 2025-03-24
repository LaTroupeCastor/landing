// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './style/style.css'
import VueGtm from 'vue-gtm'


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueGtm, {
    id: 'GTM-KVNNQGLJ',
    vueRouter: router,
    enabled: true,
    debug: false,
    loadScript: true,
})
app.mount('#app')
