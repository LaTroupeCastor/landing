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

    <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
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
          <span v-if="errors.firstname" class="text-red-500 text-sm mt-1">{{ errors.firstname }}</span>
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
          <span v-if="errors.lastname" class="text-red-500 text-sm mt-1">{{ errors.lastname }}</span>
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
            <span v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</span>
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
          <span v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</span>
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
        <span v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</span>
      </div>

      <!-- Checkbox -->
      <div class="flex items-center gap-2">
        <FormCheckbox
          v-model="formData.acceptConditions"
          :hasError="!!errors.acceptConditions"
        >
          <span class="text-sm text-black40">J'accepte les conditions d'utilisations</span>
        </FormCheckbox>
        <span v-if="errors.acceptConditions" class="text-red-500 text-sm mt-1">{{ errors.acceptConditions }}</span>
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

import FormCheckbox from "./FormCheckbox.vue";
import { ref } from 'vue';
import SectionHeader from "./sections/SectionHeader.vue";  // Add this line
import { nhost } from '../nhost';
const formData = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  message: '',
  acceptConditions: false
});

const errors = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  message: '',
  acceptConditions: ''
});

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string) => {
  return /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(phone);
};

const validateForm = () => {
  let isValid = true;
  errors.value = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
    acceptConditions: ''
  };

  if (!formData.value.firstname.trim()) {
    errors.value.firstname = 'Le prénom est requis';
    isValid = false;
  }

  if (!formData.value.lastname.trim()) {
    errors.value.lastname = 'Le nom est requis';
    isValid = false;
  }

  if (!formData.value.email.trim()) {
    errors.value.email = 'L\'email est requis';
    isValid = false;
  } else if (!validateEmail(formData.value.email)) {
    errors.value.email = 'Format d\'email invalide';
    isValid = false;
  }

  if (!formData.value.phone.trim()) {
    errors.value.phone = 'Le téléphone est requis';
    isValid = false;
  } else if (!validatePhone(formData.value.phone)) {
    errors.value.phone = 'Format de téléphone invalide';
    isValid = false;
  }

  if (!formData.value.message.trim()) {
    errors.value.message = 'Le message est requis';
    isValid = false;
  }

  if (!formData.value.acceptConditions) {
    errors.value.acceptConditions = 'Vous devez accepter les conditions';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  try {
    // Appel à votre fonction serverless de test
    const { res, error } = await nhost.functions.call('test');

    if (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'appel à la fonction');
      return;
    }

    console.log('Réponse de la fonction:', res);
    alert('Test réussi! Vérifiez la console pour voir la réponse');

  } catch (error) {
    console.error('Erreur:', error);
    alert('Une erreur est survenue');
  }
};

</script>
