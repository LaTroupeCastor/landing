<template>
  <div class="section-style">
    <SectionHeader
        :title="'Comment ça marche ?'"
        :subtitle="'Votre projet de rénovation en 3 étapes simple'"
    />
    <div class="relative">
      <img src="../../assets/section3_left.svg" alt="Illustration gauche" class="absolute left-0 top-1/2 -translate-y-1/2 h-full"/>
      <div class="max-w-3xl mx-auto mt-16">
        <div class="flex flex-col space-y-8">
          <StepItem
              :number="1"
              :text="'Faites une simulation rapide pour savoir si vous êtes éligible aux aides.'"
          />
          <StepItem
              :number="2"
              :text="'Un expert vous contacte pour étudier votre projet en détail.'"
          />
          <StepItem
              :number="3"
              :text="'Nous vous accompagnons dans toutes les étapes de votre rénovation.'"
          />
        </div>
      </div>
      <img src="../../assets/section3_right.svg" alt="Illustration droite" class="absolute right-0 top-1/2 -translate-y-1/2 h-full"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import SectionHeader from "./SectionHeader.vue";
import StepItem from "../StepItem.vue";
</script>
