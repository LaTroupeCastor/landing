<template>
  <div class="section-style">
    <SectionHeader
        :title="'Comment ça marche ?'"
        :subtitle="'Votre projet de rénovation en 3 étapes simple'"
    />
    <div class="relative">
      <img src="../../assets/section3_left.svg" alt="Illustration gauche" class="absolute -left-36 top-[30%] -translate-y-1/2"/>
      <div class="max-w-5xl mx-auto mt-16">
        <div class="flex flex-col space-y-16">
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
        <div class="mt-16 flex justify-center">
          <Button :cta="true">Commencez votre simulation maintenant</Button>
        </div>
      </div>
      <img src="../../assets/section3_right.svg" alt="Illustration droite" class="absolute -right-36  top-[30%] -translate-y-1/2"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import SectionHeader from "./SectionHeader.vue";
import StepItem from "../StepItem.vue";
import Button from "../Button.vue";
</script>
