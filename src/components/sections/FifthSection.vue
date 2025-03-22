<template>
  <div class="section-style">
    <div class="bg-secondary-5 p-8 md:p-14">
      <h2 class="text-center they-trust-us-title text-primary-1 mb-10">
        Ils nous font confiance.
      </h2>

      <div class="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
        <TheyTrustUs 
          v-for="(testimonial, index) in testimonials" 
          :key="index"
          :comment="testimonial.comment"
          :authorName="testimonial.authorName"
          :authorRole="testimonial.authorRole"
        />
      </div>

      <div class="flex justify-center mt-8">
        <router-link to="/simulation"><Button :cta="true">Commencez votre simulation maintenant</Button></router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheyTrustUs from "../TheyTrustUs.vue";
import Button from "../Button.vue";

const testimonials = [
  {
    comment: "Excellente idée d'accompagner les propriétaires et bailleurs de la phase diagnostic en passant par la recherche des aides financières et financement puis de la mise en relation avec des artisans RGE proche de son domicile. Intéressée par l'issue de vos travaux et tous mes vœux de réussite dans ce beau projet en équipe.",
    authorName: "Ilham",
    authorRole: "Propriétaire à Nantes"
  },
  {
    comment: "Le concept de simulateur intégré est très prometteur ! La démo m'a permis de mieux comprendre les enjeux des rénovations énergétiques. Hâte de voir le projet abouti pour l'utiliser dans ma copropriété.",
    authorName: "Pierre",
    authorRole: "Architecte à Lille"
  },
  {
    comment: "La clarté de la landing page donne vraiment envie d'en savoir plus. Le prototype du simulateur montre un bon potentiel pour simplifier les démarches écologiques. À suivre de près !",
    authorName: "Émilie",
    authorRole: "Conseillère énergie à Toulouse"
  }
]
</script>
