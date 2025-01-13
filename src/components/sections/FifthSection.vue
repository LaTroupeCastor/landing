<template>
  <div class="section-style pb-12">
    <div class="bg-secondary-5 p-8 md:p-14">
      <h2 class="text-center text-2xl md:text-3xl font-semibold text-primary-1 mb-10">
        Ils nous font confiance.
      </h2>

      <div class="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
        <TheyTrustUs v-for="i in 3" :key="i" />
      </div>

      <div class="flex justify-center mt-8">
        <Button :cta="true">Commencez votre simulation maintenant</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheyTrustUs from "../TheyTrustUs.vue";
import Button from "../Button.vue";
</script>
