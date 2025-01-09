<template>
  <header class="bg-white relative z-50">
    <nav class="border-gray-200 px-7 py-4 dark:gray-800">
      <div class="flex flex-wrap justify-between">
        <a href="https://flowbite.com" class="flex items-center">
          <img src="../assets/tete.svg" class="mr-3 h-14" alt="Tete Logo" />
        </a>
        <div class="flex items-center lg:order-2">
          <!-- Menu desktop -->
          <div class="hidden justify-between items-end w-full lg:flex lg:w-auto pr-8" id="mobile-menu-2">
            <ul class="flex flex-col mt-4 title-small-regular lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-100 lg:p-0
 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Aides et Primes</a>
              </li>
              <li>
                <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-100 lg:p-0
 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Notre équipe</a>
              </li>
            </ul>
          </div>
          <div class="big-separator"></div>
          <div class="flex">
            <!-- Bouton espace client visible uniquement en desktop -->
            <div class="hidden lg:block">
              <Button>Votre espace client</Button>
              <div class="little-separator"></div>
            </div>
            <Button :cta="true">Faire une simulation</Button>
          </div>

          <!-- Menu mobile -->
          <button @click="toggleMenu" type="button" class="inline-flex items-center p-1 sm:p-2 ml-6 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none
 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
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
            <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50">Aides et Primes</a>
          </li>
          <li>
            <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50">Notre équipe</a>
          </li>
          <li>
            <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50">Votre espace client</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
