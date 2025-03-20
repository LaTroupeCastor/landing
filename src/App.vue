<script setup lang="ts">
import ToastManager from "./components/ToastManager.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useRoute } from 'vue-router';
import {computed} from "vue";

const route = useRoute();
const hideHeaderFooter = computed(() => 
  route.path === '/simulation' || 
  route.name === 'login' || 
  route.name === 'register'
);
</script>

<template>
  <div class="h-screen flex flex-col">
    <Header v-if="!hideHeaderFooter" />
    <div class="flex-grow">
      <router-view />
    </div>
    <div class="mt-20" v-if="!hideHeaderFooter">
      <Footer />
    </div>
    <ToastManager />
  </div>
</template>
