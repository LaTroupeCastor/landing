<script setup lang="ts">
import MainLayout from './components/layout/MainLayout.vue'
import FirstSection from "./components/sections/FirstSection.vue";
import ToastManager from "./components/ToastManager.vue";
import SecondSection from "./components/sections/SecondSection.vue";
import ThirdSection from "./components/sections/ThirdSection.vue";
import FourthSection from "./components/sections/FourthSection.vue";
import FifthSection from "./components/sections/FifthSection.vue";

</script>

<template>
  <MainLayout>
    <div class="flex flex-col gap-20 md:gap-28 lg:gap-52">
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
    </div>
  </MainLayout>
  <ToastManager />
</template>

<style scoped>
</style>
