<template xmlns="http://www.w3.org/1999/html">
  <div class="section-style">
    <!-- Version Desktop -->
    <div class="hidden lg:block">
      <div class="pb-8">
        <SectionHeader
          title="LaTroupeCastor, votre partenaire pour une rénovation sereine."
          subtitle="Un accompagnement humain, des résultats concrets"
        />
      </div>
      <div class="flex justify-between items-center gap-8 pt-8">
        <img src="../../assets/tete.svg" alt="Castor thinking" class="w-1/5 mx-auto" />
        <div class="w-full max-w-2xl body-large-regular">
          <div class="pb-3">"Chez LaTroupeCastor, nous faisons plus que simplement vous mettre en relation avec des artisans qualifiés.</div>
          <div class="pb-3">Nous vous accompagnons du début à la fin de votre projet, tout en vous aidant à obtenir les aides financières auxquelles vous avez droit."</div>
          <div class="w-[10%] h-[6px] bg-primary-100 bg-opacity-20 my-3 mx-auto"></div>
          <div class="pb-2">Bastien Métais, <span class="font-bold">co-fondateur de LaTroupeCastor</span></div>
        </div>
      </div>
      </div>
    </div>

    <!-- Version Mobile/Tablet -->
    <div class="lg:hidden">
      <div class="pb-6 px-8">
        <SectionHeader
          title="LaTroupeCastor, votre partenaire pour une rénovation sereine."
          subtitle="Un accompagnement humain, des résultats concrets"
        />
      </div>
      <div class="flex flex-col items-center gap-4 px-4">
          <img src="../../assets/tete.svg" alt="Castor thinking" class="w-1/5 mx-auto" />
          <div class="body-small-regular md:body-medium-regular">
          <div class="pb-2">"Chez LaTroupeCastor, nous faisons plus que simplement vous mettre en relation avec des artisans qualifiés.</div>
          <div class="pb-2">Nous vous accompagnons du début à la fin de votre projet, tout en vous aidant à obtenir les aides financières auxquelles vous avez droit."</div>
          <div class="w-[10%] h-[6px] bg-primary-100 bg-opacity-20 my-3 mx-auto"></div>
          <div>Bastien Métais, <span class="font-bold">co-fondateur de LaTroupeCastor</span></div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import SectionHeader from './SectionHeader.vue'
</script>
