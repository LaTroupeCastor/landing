<template>
  <div class="section-style pb-12">
    <div class="bg-secondary-5 p-14">
      <p class="headline-medium-sbold pl-12 pb-14">Ils nous font confiance</p>
      <div class="flex justify-center items-center gap-16 pb-14">
        <TheyTrustUs />
        <TheyTrustUs />
        <TheyTrustUs />
      </div>
      <div class="flex justify-center">
        <Button :cta="true">Commencez votre simulation
          maintenant</Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import TheyTrustUs from "../TheyTrustUs.vue";
import Button from "../Button.vue";
</script>
