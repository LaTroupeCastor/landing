<template>
  <div class="flex flex-col md:flex-row md:space-x-14 space-y-10 md:space-y-0 bg-[#F3F5F7] py-10 md:py-20 px-8 md:px-36">
    <img :src="CastorFooter" alt="Castor footer" class="w-48 md:w-auto" />
    <div class="flex flex-col justify-center">
      <div class="mb-7 hidden md:block">
        Chez <strong>LaTroupeCastor</strong>, nous nous engageons à vous mettre en relation avec les bons professionnels
        pour garantir la réussite de votre projet de rénovation énergétique. C'est notre priorité absolue !
      </div>
      <div class="hidden md:flex flex-row space-x-4">
        <img :src="Facebook" alt="Facebook" />
        <img :src="Twitter" alt="Twitter" />
        <img :src="Instagram" alt="Instagram" />
      </div>
    </div>
    <div class="flex flex-col">
      <div class="title-large-sbold text-black-100 mb-4">LaTroupeCastor</div>
      <div class="flex flex-col space-y-2">
        <router-link to="/aides-et-primes" class="body-large-regular text-black-60 hover:text-black-100">Aides et primes</router-link>
        <router-link to="/notre-equipe" class="body-large-regular text-black-60 hover:text-black-100">Notre équipe</router-link>
        <router-link to="/espace-client" class="body-large-regular text-black-60 hover:text-black-100">Votre espace client</router-link>
        <router-link to="/simulation" class="body-large-regular text-black-60 hover:text-black-100">Faire une simulation</router-link>
      </div>
    </div>
    <div class="flex md:hidden flex-row space-x-4">
      <img :src="Facebook" alt="Facebook" />
      <img :src="Twitter" alt="Twitter" />
      <img :src="Instagram" alt="Instagram" />
    </div>
  </div>
</template>
<script setup lang="ts">
import CastorFooter from '../assets/castor_footer.svg';
import Facebook from '../assets/facebok.svg';
import Twitter from '../assets/twitter.svg';
import Instagram from '../assets/insta.svg';
</script>
