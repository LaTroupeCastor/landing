<template>
  <div class="not-found-container">
    <img src="/404@4x.png" alt="Castor perplexe - Page non trouvée">
    <h1>Un castor a mangé cette page !</h1>
    <p>Notre équipe de rongeurs travaille d'arrache-patte pour la récupérer.</p>
    <router-link to="/" class="home-button">
      Nager vers l'accueil
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound'
})
</script>

<style scoped>
.not-found-container {
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  background-color: #F5F7FB;
  text-align: center;
  padding: 20px;
}

img {
  width: min(100%, 320px);
  height: auto;
  margin: 0 auto 1.5rem;
  object-fit: contain;
}

h1 {
  color: #F1AB0E;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

p {
  color: #455A64;
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.home-button {
  display: inline-block;
  margin-top: 2rem;
  padding: 10px 20px;
  background: #F1AB0E;
  color: #FFFFFF;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 500;
  transition: transform 0.2s ease;
}

.home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(241, 171, 14, 0.2);
}
</style>
