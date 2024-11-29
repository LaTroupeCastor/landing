// main.ts
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import { createPinia } from 'pinia'
import './style/style.css'

const pinia = createPinia()

app.use(pinia)
app.mount('#app')
