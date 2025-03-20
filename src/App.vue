<script setup lang="ts">
import ToastManager from "./components/ToastManager.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useRoute } from 'vue-router';
import { computed } from "vue";

const route = useRoute();
const hideHeaderFooter = computed(() => 
  ['simulation', 'login', 'signup'].includes(route.name?.toString() || '')
);
</script>

<template>
  <div class="h-screen flex flex-col">
    <!-- Header desktop -->
    <Header v-if="!hideHeaderFooter" class="hidden md:block" />
    
    <!-- Header mobile -->
    <Header v-if="!hideHeaderFooter" class="md:hidden" />

    <div class="flex-grow">
      <router-view />
    </div>
    
    <div class="mt-20" v-if="!hideHeaderFooter">
      <Footer />
    </div>
    
    <ToastManager />
  </div>
</template>
