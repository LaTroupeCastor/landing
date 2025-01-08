<template>
  <div class="section-style">
    <div class="flex flex-col gap-16">
      <div>
        <SectionHeader
            :title="'Ce que Beavy fait pour vous'"
            :subtitle="'Les avantages de Beavy'"
        />
      </div>

      <div class="grid grid-cols-[40%_60%] items-center">
        <img src="../../assets/section4_left.svg"
             alt="Illustration gauche"/>
        <div class="grid grid-cols-2 gap-8">
          <WhatBeavyDoesForYou :title="'Accompagnement personnalisé'" :body="'Un professionnel labalisé RGE ABAK dédié vous suit tout au long de votre projet pour vous garantir tranquillité et efficacité.'" />
          <WhatBeavyDoesForYou :title="'Suivi des travaux en temps réel'" :body="'Restez informé de chaque étape de votre chantier, avec des mises à jour régulières sur l’avancement des travaux.'"/>
          <WhatBeavyDoesForYou :title="'Artisans qualifiés RGE  et locaux'" :body="'Nous sélectionnons pour vous des artisans locaux certifiés RGE pour des travaux de qualité et qui sont dans l’alignement de vos besoins.'"/>
          <WhatBeavyDoesForYou :title="'Des aides financières simplifiées'" :body="'Nous vous aidons à obtenir toutes les aides disponibles sans que vous ayez à gérer les démarches administratives complexes.'"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SectionHeader from "./SectionHeader.vue";
import WhatBeavyDoesForYou from "../WhatBeavyDoesForYou.vue";
</script>
