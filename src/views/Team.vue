<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold">Notre équipe</h1>
    
    <div class="flex justify-between items-start mt-12">
      <div class="max-w-xl">
        <h2 class="text-2xl font-bold mb-4">
          Chez Beavy, chaque projet de rénovation commence avec une équipe investie, déterminée à transformer vos idées en réalité.
        </h2>
        
        <div class="mt-8 space-y-4">
          <p>
            LaTroupeCastor a commencé son histoire avec 2 créateurs qui partageaient la même vision : simplifier la rénovation des logements pour les propriétaires. Ils ont alors décidé de créer une plateforme alliant expertise humain et digital.
          </p>
          <p>
            Au fil du temps, l'équipe est passée de 2 à 5 personnes, chacun apportant un savoir-faire unique : design, développement, expert énergétique, management... Ensemble, ils ont bâti un service sur mesure qui accompagne chaque client de A à Z, avec un engagement fort pour l'humain et la qualité.
          </p>
        </div>
      </div>
      
      <div class="flex-shrink-0">
        <img src="@/assets/castor_footer.svg" alt="Castors" class="w-48" />
      </div>
    </div>

    <div class="grid grid-cols-3 gap-8 mt-16">
      <div v-for="i in 6" :key="i" class="text-center">
        <div class="relative mb-4">
          <div class="bg-orange-100 rounded-lg p-4">
            <img src="@/assets/visage_personne.png" alt="Photo de profil" class="w-full rounded-lg" />
          </div>
          <div class="absolute bottom-0 left-0 flex gap-2">
            <span class="bg-orange-200 text-sm px-3 py-1 rounded-full">Développeur</span>
            <span class="bg-orange-200 text-sm px-3 py-1 rounded-full">Data analyste</span>
          </div>
        </div>
        <h3 class="font-bold text-xl mb-2">Bastien Métais</h3>
        <p class="text-gray-600">
          Il a rejoint l'équipe peut après la création pour le développement de la plateforme
        </p>
      </div>
    </div>

    <div class="bg-orange-100 rounded-lg p-8 mt-16 flex justify-between items-center">
      <p class="text-xl">Un projet ? Une question ? Vous souhaitez simuler vos aides ?</p>
      <button class="bg-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-50">
        Contactez-nous maintenant
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
