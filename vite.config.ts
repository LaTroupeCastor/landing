import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    // Ajout de cette configuration pour les variables d'environnement
    'process.env': {},
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  },
  // Ajout de la configuration pour les variables d'environnement
  envPrefix: 'VITE_'
})
