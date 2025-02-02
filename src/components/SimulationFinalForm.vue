<script setup lang="ts">
import Button from './Button.vue'
import { ref } from 'vue'

interface Props {
  onSubmit: (data: { firstName: string; lastName: string; email: string }) => void
}

defineEmits(['back'])
const props = defineProps<Props>()

const firstName = ref('')
const lastName = ref('')
const email = ref('')

const handleSubmit = () => {
  props.onSubmit({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value
  })
}
</script>

<template>
  <div class="max-w-3xl w-full">
    <h2 class="headline-small-sbold mb-6 flex justify-center">
      Recevez vos résultats par email
    </h2>
    <p class="title-medium-regular mb-16 flex justify-center">
      Remplissez le formulaire ci-dessous pour recevoir votre simulation détaillée
    </p>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="flex gap-4">
        <div class="flex-1">
          <label class="block body-medium-sbold mb-2">Prénom</label>
          <input
            v-model="firstName"
            type="text"
            required
            class="w-full p-3 border border-black-20 rounded-lg"
          />
        </div>
        <div class="flex-1">
          <label class="block body-medium-sbold mb-2">Nom</label>
          <input
            v-model="lastName"
            type="text"
            required
            class="w-full p-3 border border-black-20 rounded-lg"
          />
        </div>
      </div>

      <div>
        <label class="block body-medium-sbold mb-2">Email</label>
        <input
          v-model="email"
          type="email"
          required
          class="w-full p-3 border border-black-20 rounded-lg"
        />
      </div>

      <div class="flex justify-between mt-10">
        <Button
          leading-icon="./src/assets/previous.svg"
          class="text-primary-100 title-small-sbold"
          type="button"
          @click="$emit('back')"
        >
          Retour
        </Button>
        <Button
          :cta="true"
          type="submit"
          class="text-primary-100 title-small-sbold"
        >
          Recevoir mes résultats
        </Button>
      </div>
    </form>
  </div>
</template>
