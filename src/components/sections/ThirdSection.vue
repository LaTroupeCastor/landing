<template>
  <div class="section-style">
    <SectionHeader
        :title="'Comment ça marche ?'"
        :subtitle="'Votre projet de rénovation en 3 étapes simple'"
    />
    <div class="flex flex-col items-center mt-16 gap-16">
      <StepItem
          :number="1"
          :text="'Faites une simulation rapide pour savoir si vous êtes éligible aux aides.'"
      />
      <StepItem
          :number="2"
          :text="'Faites une simulation rapide pour savoir si vous êtes éligible aux aides.'"
      />
      <StepItem
          :number="3"
          :text="'Faites une simulation rapide pour savoir si vous êtes éligible aux aides.'"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import SectionHeader from "./SectionHeader.vue";
import StepItem from "../StepItem.vue";
</script>
