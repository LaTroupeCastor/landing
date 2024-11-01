<template>
  <div class="grid justify-between px-36">
    <SectionHeader 
      title="Beavy, votre partenaire pour une rénovation sereine."
      subtitle="Un accompagnement humain, des résultats concrets"
    />
    <div class="flex pl-10 pt-16 gap-[20%] items-center">
      <img src="../../assets/circle_section_2.svg" alt="Circle" class="absolute transform -translate-x-1/4" />
      <div class="w-[40%]">
        <img src="../../assets/crane.png" alt="Crane" class="relative w-full" />
      </div>
      <div class="flex-col w-[30%] body-large-regular">
        <div class="pb-4">“Chez Beavy, nous faisons plus que simplement vous mettre en relation avec des artisans qualifiés.</div>
        <div class="pb-4">Nous vous accompagnons du début à la fin de votre projet, tout en vous aidant à obtenir les aides financières auxquelles vous avez droit.”</div>
        <div class="w-[10%] h-[6px] bg-primary bg-opacity-20 my-4"></div>
        <div>Bastien Métais, <span class="font-bold">co-fondateur de Beavy</span></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SectionHeader from './SectionHeader.vue'
</script>
