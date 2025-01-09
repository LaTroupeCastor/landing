<script setup lang="ts">
import MainLayout from './components/layout/MainLayout.vue'
import FirstSection from "./components/sections/FirstSection.vue";
import ToastManager from "./components/ToastManager.vue";

</script>

<template>
  <MainLayout>
    <div class="flex flex-col gap-52">
      <FirstSection />
    </div>
  </MainLayout>
  <ToastManager />
</template>

<style scoped>
</style>
