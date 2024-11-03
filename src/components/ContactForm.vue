<template>
  <div alt="form" class="flex-col flex">
    <SectionHeader :title="'Parlons ensemble de votre projet'" :subtitle="'Vous avez des questions ?'"/>
    <div alt="divider" class="bg-divider h-[1.5px] my-6 mb-4"/>
    <p class="body-large-regular text-black40">Vous avez des questions sur les aides disponibles ou souhaitez en savoir
      plus sur notre outil et notre accompagnement personnalisé ? N’hésitez pas à nous contacter, nous vous répondrons
      sous 48 heures.</p>
  </div>
</template>
<script setup lang="ts">
import SectionHeader from "./sections/SectionHeader.vue";
</script>
