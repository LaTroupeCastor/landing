<template>
  <div class="flex-col flex max-w-[600px]">
    <SectionHeader :title="'Parlons ensemble de votre projet'" :subtitle="'Vous avez des questions ?'"/>
    <div class="bg-divider h-[1.5px] my-6"/>
    <p class="body-large-regular text-black40">Vous
      avez des questions sur les aides disponibles ou
      souhaitez en savoir
      plus sur notre outil et notre accompagnement
      personnalisé ? N'hésitez pas à nous contacter, nous
      vous répondrons
      sous 48 heures.</p>

    <form @submit.prevent="handleSubmit" class="mt-8
 space-y-6">
      <div class="grid grid-cols-2 gap-4">
        <!-- Prénom -->
        <div class="flex flex-col">
          <label for="firstname"
                 class="mb-2">Prénom</label>
          <input
              type="text"
              id="firstname"
              v-model="formData.firstname"
              placeholder="Prénom"
              class="p-3 bg-[#F4F4F4] rounded-lg h-12"
          >
        </div>

        <!-- Nom -->
        <div class="flex flex-col">
          <label for="lastname"
                 class="mb-2">Nom</label>
          <input
              type="text"
              id="lastname"
              v-model="formData.lastname"
              placeholder="Nom"
              class="p-3 bg-[#F4F4F4] rounded-lg"
          >
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <!-- Email -->
        <div class="flex flex-col">
          <label for="email" class="mb-2">Email</label>
            <input
                type="email"
                id="email"
                v-model="formData.email"
                placeholder="Email"
                class="p-3 bg-[#F4F4F4] rounded-lg"
            >
        </div>

        <!-- Téléphone -->
        <div class="flex flex-col">
          <label for="phone"
                 class="mb-2">Téléphone</label>
          <input
              type="tel"
              id="phone"
              v-model="formData.phone"
              placeholder="Téléphone"
              class="p-3 bg-[#F4F4F4] rounded-lg"
          >
        </div>
      </div>

      <!-- Message -->
      <div class="flex flex-col">
        <label for="message"
               class="mb-2">Message</label>
        <textarea
            id="message"
            v-model="formData.message"
            placeholder="Message"
            rows="4"
            class="p-3 bg-[#F4F4F4] rounded-lg
 resize-none"
        ></textarea>
      </div>

      <!-- Checkbox -->
      <div class="flex items-center gap-2">
        <Checkbox v-model="formData.acceptConditions"
        />
        <label class="text-sm text-black40">J'accepte
          les condititions d'utilisations</label>
      </div>

      <!-- Submit Button -->
      <button
          type="submit"
          class="bg-[#FBF6EE] text-black px-12 py-4 rounded-lg flex items-center gap-2 w-fit"
      >
        Envoyer
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rotate-45">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import SectionHeader from "./sections/SectionHeader.vue";
</script>
