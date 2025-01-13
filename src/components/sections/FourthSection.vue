<template>
  <div class="section-style">
    <div class="flex flex-col gap-8">
      <div>
        <SectionHeader
            :title="'Ce que LaTroupeCastor fait pour vous'"
            :subtitle="'Les avantages de LaTroupeCastor'"
        />
      </div>

      <!-- Container principal -->
      <div class="flex lg:flex-row flex-col items-center gap-8">
        <!-- Container des cartes -->
        <div class="flex flex-col w-full order-2 lg:order-1 lg:w-[60%] gap-8">
          <!-- Première rangée -->
          <div class="flex flex-col md:flex-row gap-8">
            <div class="w-full md:w-1/2">
              <WhatWeDoesForYou
                  :title="'Accompagnement personnalisé'"
                  :body="'Un professionnel labalisé RGE ABAK dédié vous suit tout au long de votre projet pour vous garantir tranquillité et efficacité.'"
              />
            </div>
            <div class="w-full md:w-1/2">
              <WhatWeDoesForYou
                  :title="'Suivi des travaux en temps réel'"
                  :body="'Restez informé de chaque étape de votre chantier, avec des mises à jour régulières sur l\'avancement des travaux.'"
              />
            </div>
          </div>

          <!-- Image pour tablette -->
          <img src="../../assets/section4_left.svg"
               alt="Illustration gauche"
               class="hidden md:block lg:hidden max-w-full mx-auto"/>

          <!-- Image pour mobile -->
          <div class="md:hidden">
            <img src="../../assets/section4_left.svg"
                 alt="Illustration gauche"
                 class="max-w-full mx-auto"/>
          </div>

          <!-- Deuxième rangée -->
          <div class="flex flex-col md:flex-row gap-8">
            <div class="w-full md:w-1/2">
              <WhatWeDoesForYou
                  :title="'Artisans qualifiés RGE  et locaux'"
                  :body="'Nous sélectionnons pour vous des artisans locaux certifiés RGE pour des travaux de qualité et qui sont dans l\'alignement de vos besoins.'"
              />
            </div>
            <div class="w-full md:w-1/2">
              <WhatWeDoesForYou
                  :title="'Des aides financières simplifiées'"
                  :body="'Nous vous aidons à obtenir toutes les aides disponibles sans que vous ayez à gérer les démarches administratives complexes.'"
              />
            </div>
          </div>
        </div>

        <!-- Image pour desktop -->
        <div class="hidden lg:block order-1 lg:order-2 lg:w-[40%]">
          <img src="../../assets/section4_left.svg"
               alt="Illustration gauche"
               class="max-w-full mx-auto"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionHeader from "./SectionHeader.vue";
import WhatWeDoesForYou from "../WhatWeDoesForYou.vue";
</script>
