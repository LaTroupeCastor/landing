<script setup lang="ts">
import ToastManager from "./components/ToastManager.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <div class="flex-grow">
      <router-view />
    </div>
    <div class="mt-20">
      <Footer />
    </div>
    <ToastManager />
  </div>
</template>
