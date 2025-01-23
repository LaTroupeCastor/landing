<template>
  <header class="bg-white relative z-50">
    <nav class="border-gray-200 px-7 py-4">
      <div class="flex w-full justify-between items-center">
        <!-- Logo castor -->
        <router-link to="/" class="flex items-center">
          <img src="../assets/tete.svg" class="h-14" alt="Tete Logo" />
        </router-link>

        <!-- Menu et boutons -->
        <div class="flex items-center gap-8">
          <!-- Menu desktop -->
          <div class="hidden lg:block">
            <ul class="flex title-small-regular space-x-8">
              <li>
                <router-link to="/aides-et-primes" class="hover:text-primary-100">Aides et Primes</router-link>
              </li>
              <li>
                <router-link to="/notre-equipe" class="hover:text-primary-100">Notre équipe</router-link>
              </li>
            </ul>
          </div>

          <!-- Boutons -->
          <div class="flex items-center gap-4">
            <div class="hidden lg:block">
              <router-link to="/espace-client">
                <Button>Votre espace client</Button>
              </router-link>
            </div>
            <router-link to="/simulation">
              <Button :cta="true">Faire une simulation</Button>
            </router-link>
          </div>

          <!-- Menu hamburger mobile -->
          <button @click="toggleMenu" type="button" class="inline-flex items-center p-1 sm:p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none
 focus:ring-2 focus:ring-gray-200">
            <span class="sr-only">Open main menu</span>
            <svg class="w-8 h-8 sm:w-10 sm:h-10" :class="{ 'hidden': isMenuOpen }" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0
 01-1-1z" clip-rule="evenodd"></path>
            </svg>
            <svg class="w-10 h-10" :class="{ 'hidden': !isMenuOpen }" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1
 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu mobile déplié -->
      <div :class="{ 'hidden': !isMenuOpen }" class="lg:hidden" id="mobile-menu-2">
        <ul class="flex flex-col mt-4 title-small-regular">
          <li>
            <router-link to="/aides-et-primes" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50">Aides et Primes</router-link>
          </li>
          <li>
            <router-link to="/notre-equipe" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50">Notre équipe</router-link>
          </li>
          <li>
            <router-link to="/espace-client" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50">Votre espace client</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import { ref } from 'vue';
import { useUserStore } from '../store/userStore';

const userStore = useUserStore();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
