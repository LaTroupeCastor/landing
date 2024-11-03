<template>
  <div alt="form" class="flex-col flex">
    <SectionHeader :title="'Parlons ensemble de votre projet'" :subtitle="'Vous avez des questions ?'"/>
    <div alt="divider" class="bg-divider h-[1.5px] my
 mb-4"/>
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
              class="p-3 bg-[#F4F4F4] rounded-lg"
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
          class="bg-primary text-white px-8 py-3
 rounded-lg flex items-center gap-2"
      >
        Envoyer
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import SectionHeader from "./sections/SectionHeader.vue";
</script>
