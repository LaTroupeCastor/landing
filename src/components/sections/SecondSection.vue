<template>
  <div class="section-style">
    <!-- Version Desktop -->
    <div class="hidden lg:block">
      <SectionHeader
          title="LaTroupeCastor, votre partenaire pour une rénovation sereine."
          subtitle="Un accompagnement humain, des résultats concrets"
      />
      <div class="flex pl-10 pt-16 gap-[20%] items-center">
        <img src="../../assets/circle_section_2.svg" alt="Circle" class="absolute transform -translate-x-1/4" />
        <div class="w-[40%]">
          <img src="../../assets/crane.png" alt="Crane" class="relative w-full" />
        </div>
        <div class="flex-col w-[30%] body-large-regular">
          <div class="pb-4">"Chez LaTroupeCastor, nous faisons plus que simplement vous mettre en relation avec des artisans qualifiés.</div>
          <div class="pb-4">Nous vous accompagnons du début à la fin de votre projet, tout en vous aidant à obtenir les aides financières auxquelles vous avez droit."</div>
          <div class="w-[10%] h-[6px] bg-primary-100 bg-opacity-20 my-4"></div>
          <div>Bastien Métais, <span class="font-bold">co-fondateur de LaTroupeCastor</span></div>
        </div>
      </div>
    </div>

    <!-- Version Mobile/Tablet -->
    <div class="lg:hidden">
      <div>
        <div class="title-small-medium text-primary-60">Un accompagnement humain, des résultats concrets</div>
        <div class="headline-small-sbold mt-4">Beavy, votre partenaire pour une rénovation sereine.</div>
        <img src="../../assets/crane.png" alt="Crane" class="w-full h-[400px] sm:h-[500px] object-cover object-top py-10" />
      </div>

      <div class="body-large-regular">
        <div class="pb-4">"Chez Beavy, nous faisons plus que simplement vous mettre en relation avec des artisans qualifiés.</div>
        <div class="pb-4">Nous vous accompagnons du début à la fin de votre projet, tout en vous aidant à obtenir les aides financières auxquelles vous avez droit."</div>
        <div class="w-[10%] h-[6px] bg-primary-100 bg-opacity-20 my-4"></div>
        <div>Bastien Métais, <span class="font-bold">co-fondateur de Beavy</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionHeader from './SectionHeader.vue'
</script>
