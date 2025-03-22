<template>
  <div class="section-style">
    <SectionHeader
        :title="'Comment ça marche ?'"
        :subtitle="'Votre projet de rénovation en 3 étapes simple'"
    />


        <div class="lg:flex lg:flex-row lg:space-x-16 lg:mt-16 items-center">
          <div class="flex flex-col gap-10 mt-6 lg:w-4/6">
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
          <div class="w-1/2 lg:flex hidden items-center justify-center self-stretch">
            <img
              src="../../assets/idea_castor.png"
              alt="Idée Castor"
              class="w-full h-auto object-contain"
            >
          </div>
        </div>
        <div class="lg:flex mt-16 hidden justify-center">
          <router-link to="/simulation"><Button :cta="true">Commencez votre simulation maintenant</Button></router-link>
        </div>
      </div>

</template>
<script setup lang="ts">
import SectionHeader from "./SectionHeader.vue";
import StepItem from "../StepItem.vue";
import Button from "../Button.vue";
</script>
