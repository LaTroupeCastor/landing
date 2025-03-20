<template>
  <div class="section-style mt-20">
    <div class="flex-row flex">
      <h1 class="headline-large-medium w-9/12">Aides et primes</h1>
    </div>

    <div class="w-full bg-primary-100 h-[1px] my-10"/>

    <div class="flex flex-col md:flex-row justify-between items-start gap-6">
      <div>
        <h2 class="w-full md:w-9/12 title-medium-medium text-black-100">
          LaTroupeCastor a réuni pour vous l'ensemble des aides disponibles dans votre région pour minimiser le coût de rénovation de votre bien.
        </h2>
      </div>
        <div class="w-full md:w-9/12 body-large-regular text-black-60">
          <p>
            Découvrez toutes les aides disponibles pour votre projet de rénovation énergétique. Notre équipe d'experts vous accompagne dans l'identification et l'obtention des subventions auxquelles vous avez droit.
          </p>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
      <AidCard
        title="MaPrimeRénov'"
        amount="jusqu'à 20 000€"
        description="Aide nationale pour la rénovation énergétique des logements anciens."
        :conditions="[
          'Propriétaires occupants, bailleurs ou copropriétaires',
          'Logement construit depuis plus de 15 ans',
          'Travaux éligibles : isolation, chauffage, ventilation',
          'Cumulable avec les aides locales'
        ]"
        link="https://www.maprimerenov.gouv.fr"
        linkText="MaPrimeRénov'"
      />

      <AidCard
        title="Aide départementale Maine-et-Loire"
        amount="Jusqu'à 3 500€"
        description="Subvention du département pour les travaux énergétiques."
        :conditions="[
          '1 500€ pour logements classés F/G',
          '+1 500€ si atteint A/B après travaux',
          '500€ pour matériaux biosourcés',
          'Cumulable avec MaPrimeRénov'
        ]"
        link="https://www.maine-et-loire.fr/aides-et-services/logement-et-habitat"
        linkText="Département 49"
      />
    </div>

    <div class="bg-primary-100 rounded-lg p-6 flex-col md:flex-row justify-between items-center gap-4 my-8 hidden md:flex">
      <p class="title-small-medium text-white text-center md:text-left">Un projet ? Une question ? Vous souhaitez simuler vos aides ?</p>
      <router-link to="/simulation">
        <button class="title-small-sbold text-primary-100 bg-white p-4 rounded-md whitespace-nowrap">
          Simulez vos aides maintenant
        </button>
      </router-link>
    </div>

    <div class="bg-primary-100 rounded-lg p-6 flex flex-col sm:flex-row justify-between items-center gap-4 my-8 md:hidden">
      <p class="title-small-medium text-white text-center sm:text-left mb-4 sm:mb-0">Un projet ? Une question ? Vous souhaitez simuler vos aides ?</p>
      <router-link to="/simulation">
        <button class="title-small-sbold text-primary-100 bg-white p-4 rounded-md whitespace-nowrap">
          Simulez vos aides maintenant
        </button>
      </router-link>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AidCard
        title="Aide amélioration énergétique Saumur"
        amount="Jusqu'à 1 000€"
        description="Subvention de la communauté d'agglomération Saumur Val de Loire."
        :conditions="[
          '10% du montant HT des travaux',
          'Artisan RGE obligatoire',
          'Cumulable avec aides nationales',
          'Résidence dans l\'agglomération'
        ]"
        link="https://www.saumurvaldeloire.fr"
        linkText="Agglo Saumur"
      />

      <AidCard
        title="Fonds Air Bois"
        amount="Jusqu'à 1 000€"
        description="Remplacement des vieux appareils de chauffage au bois."
        :conditions="[
          'Disponible dans le Maine-et-Loire',
          'Appareil performant label Flamme Verte',
          'Installation par professionnel RGE',
          'Ancien appareil à éliminer'
        ]"
        link="https://services.totalenergies.fr/particuliers/conseils/renover-logement/qu-est-ce-que-la-prime-air-bois"
        linkText="Fonds Air Bois"
      />

      <AidCard
        title="Aides spécifiques communes"
        amount="Variables"
        description="Subventions complémentaires selon votre municipalité."
        :conditions="[
          'Conditions spécifiques à chaque commune',
          'Exemples : panneaux solaires, isolation écologique',
          'Contactez votre mairie',
          'Cumul possible avec aides nationales'
        ]"
        link="https://www.angers.fr"
        linkText="Votre mairie"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AidCard from "../components/AidCard.vue";
</script>
