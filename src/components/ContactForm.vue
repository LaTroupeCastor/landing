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
              :class="{ 'border-2 border-red-500': errors.firstname }"
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
              :class="{ 'border-2 border-red-500': errors.lastname }"
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
                :class="{ 'border-2 border-red-500': errors.email }"
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
              :class="{ 'border-2 border-red-500': errors.phone }"
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
            class="p-3 bg-[#F4F4F4] rounded-lg resize-none"
            :class="{ 'border-2 border-red-500': errors.message }"
        ></textarea>
        <span v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</span>
      </div>

      <!-- Checkbox -->
      <div class="flex flex-col gap-1">
        <FormCheckbox
            v-model="formData.acceptConditions"
            :hasError="!!errors.acceptConditions"
        >
          <span class="text-sm text-black40">J'accepte les conditions d'utilisations</span>
        </FormCheckbox>
        <span v-if="errors.acceptConditions" class="text-red-500 text-sm">{{ errors.acceptConditions }}</span>
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
import {ref, watch} from 'vue';
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

// Ajout des watchers pour validation en temps réel
watch(() => formData.value.firstname, (newValue) => {
  if (newValue.trim()) {
    errors.value.firstname = '';
  }
});

watch(() => formData.value.lastname, (newValue) => {
  if (newValue.trim()) {
    errors.value.lastname = '';
  }
});

watch(() => formData.value.email, (newValue) => {
  if (validateEmail(newValue)) {
    errors.value.email = '';
  }
});

watch(() => formData.value.phone, (newValue) => {
  if (validatePhone(newValue)) {
    errors.value.phone = '';
  }
});

watch(() => formData.value.message, (newValue) => {
  if (newValue.trim()) {
    errors.value.message = '';
  }
});

watch(() => formData.value.acceptConditions, (newValue) => {
  if (newValue) {
    errors.value.acceptConditions = '';
  }
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
    const { res, error } = await nhost.functions.call('mail', {
      body: {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
        email: formData.value.email,
        phone: formData.value.phone,
        message: formData.value.message
      }
    });

    if (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi de l\'email');
      return;
    }

    console.log('Email envoyé:', res);
    alert('Votre message a été envoyé avec succès!');
    // Réinitialiser le formulaire après succès
    formData.value = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      message: '',
      acceptConditions: false
    };

  } catch (error) {
    console.error('Erreur:', error);
    alert('Une erreur est survenue lors de l\'envoi du message');
  }
};

</script>
