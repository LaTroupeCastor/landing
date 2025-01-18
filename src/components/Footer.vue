<template>
  <div class="flex flex-col lg:flex-row lg:space-x-14 space-y-8 lg:space-y-0 bg-[#F3F5F7] py-10 lg:py-20 px-8 lg:px-36">
    <img :src="CastorFooter" alt="Castor footer" class="w-48 lg:w-auto" />
    <div class="flex flex-col justify-center">
      <div class="mb-7 hidden lg:block">
        Chez <strong>LaTroupeCastor</strong>, nous nous engageons à vous mettre en relation avec les bons professionnels
        pour garantir la réussite de votre projet de rénovation énergétique. C'est notre priorité absolue !
      </div>
      <div class="hidden lg:flex flex-row space-x-4">
        <img :src="Facebook" alt="Facebook" />
        <img :src="Twitter" alt="Twitter" />
        <img :src="Instagram" alt="Instagram" />
      </div>
    </div>
    <div class="flex flex-col">
      <div class="title-large-sbold text-black-100 mb-4">LaTroupeCastor</div>
      <div class="flex flex-col space-y-2">
        <div class="body-large-regular text-black-60">Aides et primes</div>
        <div class="body-large-regular text-black-60">Notre équipe</div>
        <div class="body-large-regular text-black-60">Votre espace client</div>
        <div class="body-large-regular text-black-60">Faire une simulation</div>
      </div>
    </div>
    <div class="flex lg:hidden flex-row space-x-4">
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
