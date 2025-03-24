// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './style/style.css'
import VueGtag from 'vue-gtag'


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Google Analytics via vue-gtag (GA4 direct)
app.use(VueGtag, {
    config: { id: 'G-3Q6LFDQ93Z' },
    appName: 'MyVueApp', // facultatif
    pageTrackerScreenviewEnabled: true
  }, router)
app.mount('#app')
