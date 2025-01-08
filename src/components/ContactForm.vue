<template>
  <div class="flex-col flex max-w-[600px]">
    <SectionHeader :title="'Parlons ensemble de votre projet'" :subtitle="'Vous avez des questions ?'"/>
    <div class="bg-[#EBEBEB] h-[1.5px] my-6"/>
    <p class="body-large-regular text-black-40">Vous
      avez des questions sur les aides disponibles ou
      souhaitez en savoir
      plus sur notre outil et notre accompagnement
      personnalisé ? N'hésitez pas à nous contacter, nous
      vous répondrons
      sous 48 heures.</p>

    <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
      <div class="grid grid-cols-2x gap-4">
        <!-- Prénom -->
        <FormField
            id="firstname"
            label="Prénom"
            v-model="formData.firstname"
            placeholder="Prénom"
            :error="errors.firstname"
        />

        <!-- Nom -->
        <FormField
            id="lastname"
            label="Nom"
            v-model="formData.lastname"
            placeholder="Nom"
            :error="errors.lastname"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <!-- Email -->
        <FormField
            id="email"
            label="Email"
            type="email"
            v-model="formData.email"
            placeholder="Email"
            :error="errors.email"
        />

        <!-- Téléphone -->
        <FormField
            id="phone"
            label="Téléphone"
            type="tel"
            v-model="formData.phone"
            placeholder="Téléphone"
            :error="errors.phone"
        />
      </div>

      <!-- Message -->
      <div class="flex flex-col">
        <label for="message"
               class="mb-2 title-small-medium">Message</label>
        <textarea
            id="message"
            v-model="formData.message"
            placeholder="Message"
            rows="4"
            class="p-3 bg-black-10 rounded-lg resize-none body-small-regular placeholder-black-60"
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
          <span class="body-small-regular text-[#A19F99]">J'accepte les conditions d'utilisations</span>
        </FormCheckbox>
        <span v-if="errors.acceptConditions" class="text-red-500 text-sm">{{ errors.acceptConditions }}</span>
      </div>

      <!-- Submit Button -->
      <Button type="submit" :cta="true" trailing-icon="./src/assets/send_arrow.svg" :loading="loading" :disabled="isButtonDisabled">Envoyer</Button>
    </form>
  </div>
</template>

<script setup lang="ts">

import FormCheckbox from "./FormCheckbox.vue";
import {computed, ref, watch} from 'vue';
import SectionHeader from "./sections/SectionHeader.vue"; // Add this line
import {supabase} from "../supabase_client.ts";
import {ToastType, useToastStore} from "../store/toastStore.ts";
import Button from "./Button.vue";
import FormField from "./FormField.vue";

const toastStore = useToastStore();
const loading = ref(false);
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

const isButtonDisabled = computed(() => {
  const {
    firstname,
    lastname,
    email,
    phone,
    message,
    acceptConditions
  } = formData.value;

  return !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !message.trim() ||
      !acceptConditions;
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

  loading.value = true;
  try {
    const { error } = await supabase.functions.invoke('send_mail', {
      body: JSON.stringify({
        emailFrom: formData.value.email,
        message: formData.value.message,
        name: formData.value.firstname,
        subname: formData.value.lastname,
        phone: formData.value.phone
      }),
      method: 'POST',
    });

    if (error) {
      toastStore.addToast('Erreur lors de l\'envoi de l\'email', ToastType.ERROR);
      return;
    }

    // Réinitialiser le formulaire après succès
    formData.value = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      message: '',
      acceptConditions: false
    };

    toastStore.addToast('Message envoyé avec succès', ToastType.SUCCESS);
  } catch (error) {
    toastStore.addToast('Une erreur est survenue lors de l\'envoi du message', ToastType.ERROR);
  } finally {
    loading.value = false;
  }
};

</script>
