<template>
  <div class="section-style mt-20">
    <div class="flex-row flex">
      <h1 class="headline-large-medium w-9/12">Notre équipe</h1>
      <div class="flex flex-row w-9/12 justify-center hidden md:flex">
        <img
          v-for="i in 6"
          :key="i"
          src="../assets/tete.svg"
          alt="Castors"
          class="w-14 -ml-6 first:ml-0"
        />
      </div>
    </div>

    <div class="w-full bg-primary-100 h-[1px] my-10"/>

    <div class="flex flex-col md:flex-row justify-between items-start gap-6">
      <div>
        <h2 class="w-full md:w-9/12 title-medium-medium text-black-100">
          Chez Beavy, chaque projet de rénovation commence avec une équipe investie, déterminée à transformer vos idées en réalité.
        </h2>
      </div>
        <div class="w-full md:w-9/12 body-large-regular text-black-60">
          <p>
            LaTroupeCastor a commencé son histoire avec 2 créateurs qui partageaient la même vision : simplifier la rénovation des logements pour les propriétaires. Ils ont alors décidé de créer une plateforme alliant expertise humain et digital.<br><br>
            Au fil du temps, l'équipe est passée de 2 à 5 personnes, chacun apportant un savoir-faire unique : design, développement, expert énergétique, management... Ensemble, ils ont bâti un service sur mesure qui accompagne chaque client de A à Z, avec un engagement fort pour l'humain et la qualité.
          </p>
        </div>
    </div>

    <div class="flex flex-wrap gap-8 mt-16 max-w-screen-xl mx-auto">
      <div class="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
        <TeamMemberCard
            name="Paul"
            nickname="Paul"
            :profileImage="Paul"
            :roles="['Commercial']"
            description="Il accompagne nos clients dans leurs projets de rénovation"
        />
      </div>
      <div class="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
        <TeamMemberCard
          name="Maxence"
          nickname="Maxence"
          :profileImage="VisagePersonne"
          :roles="['Designer']"
          description="Expert en design d'interface, il crée des expériences utilisateur intuitives"
        />
      </div>
      <div class="hidden lg:block w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
        <TeamMemberCard
          name="Vincent"
          nickname="Vincent"
          :profileImage="VisagePersonne"
          :roles="['Expert']"
          description="Spécialiste des solutions énergétiques pour l'habitat"
        />
      </div>
    </div>

    <div class="bg-primary-100 rounded-lg p-6 flex-col md:flex-row justify-between items-center gap-4 my-20 hidden md:flex">
      <p class="title-small-medium text-white text-center md:text-left">Un projet ? Une question ? Vous souhaitez simuler vos aides ?</p>
      <router-link to="/simulation">
        <button class="title-small-sbold text-primary-100 bg-white p-4 rounded-md whitespace-nowrap">
          Faire une simulation
        </button>
      </router-link>
    </div>

    <div class="flex flex-wrap gap-8 max-w-screen-xl mx-auto">
      <div class="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
        <TeamMemberCard
            name="Bastien"
            nickname="Bastien"
            :profileImage="Bastien"
            :roles="['Développeur', 'Développeur']"
            description="Il a rejoint l'équipe peut après la création pour le développement de la plateforme"
        />
      </div>
      <div class="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
        <TeamMemberCard
          name="Mathéo"
          nickname="Mathéo"
          :profileImage="Matheo"
          :roles="['Marketing']"
          description="Elle développe notre présence et notre communication"
        />
      </div>
      <div class="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
        <TeamMemberCard
          name="Océane"
          nickname="Océane"
          :profileImage="Oceanne"
          :roles="['Marketing']"
          description="Elle développe notre présence et notre communication"
        />
      </div>
    </div>
    <div class="bg-primary-100 rounded-lg p-6 flex flex-col sm:flex-row justify-between items-center gap-4 my-20 md:hidden">
      <p class="title-small-medium text-white text-center sm:text-left mb-4 sm:mb-0">Un projet ? Une question ? Vous souhaitez simuler vos aides ?</p>
      <router-link to="/simulation">
        <button class="title-small-sbold text-primary-100 bg-white p-4 rounded-md whitespace-nowrap">
          Faire une simulation
        </button>
      </router-link>
    </div>
    <FormBody class="mt-16"/>
  </div>
</template>

<script setup lang="ts">
import TeamMemberCard from "../components/TeamMemberCard.vue";
import VisagePersonne from "../assets/visage_personne.png";
import Bastien from "../assets/team/bastien.png";
import Matheo from "../assets/team/matheo.jpg";
import Oceanne from "../assets/team/oceane.jpg";
import Paul from "../assets/team/paul.jpg";
import FormBody from "../components/FormBody.vue";

</script>
