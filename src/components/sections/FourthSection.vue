<template>
  <div class="section-style">
    <div class="flex flex-col gap-8">
      <div>
        <SectionHeader
            :title="'Ce que LaTroupeCastor fait pour vous'"
            :subtitle="'Les avantages de LaTroupeCastor'"
        />
      </div>

      <!-- Modification de la grid pour la rendre responsive -->
      <div class="grid lg:grid-cols-[40%_60%] grid-cols-1 items-center gap-8">
        <div class="grid md:grid-cols-2 grid-cols-1 gap-8">
          <WhatWeDoesForYou
              :title="'Accompagnement personnalisé'"
              :body="'Un professionnel labalisé RGE ABAK dédié vous suit tout au long de votre projet pour vous garantir tranquillité et efficacité.'"
          />
          <WhatWeDoesForYou
              :title="'Suivi des travaux en temps réel'"
              :body="'Restez informé de chaque étape de votre chantier, avec des mises à jour régulières sur l\'avancement des travaux.'"
          />
          <img src="../../assets/section4_left.svg"
               alt="Illustration gauche"
               class="max-w-full mx-auto"/>
          <WhatWeDoesForYou
              :title="'Artisans qualifiés RGE  et locaux'"
              :body="'Nous sélectionnons pour vous des artisans locaux certifiés RGE pour des travaux de qualité et qui sont dans l\'alignement de vos besoins.'"
          />
          <WhatWeDoesForYou
              :title="'Des aides financières simplifiées'"
              :body="'Nous vous aidons à obtenir toutes les aides disponibles sans que vous ayez à gérer les démarches administratives complexes.'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SectionHeader from "./SectionHeader.vue";
import WhatWeDoesForYou from "../WhatWeDoesForYou.vue";
</script>
