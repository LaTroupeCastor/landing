<script setup lang="ts">
import { ref, defineProps, watch } from 'vue'
import { supabase } from "../supabase_client.js";
import { useUserStore } from '../store/userStore';
import { useRouter } from 'vue-router';
import { ToastType, useToastStore } from '../store/toastStore';
import Button from './Button.vue';
import { User, UserRole } from "../models/user.ts";
import type { Simulation } from "../models/simulation";
const props = defineProps<{
  //simulationData is a ref of type Simulation
  simulationData: Simulation | null
}>()
console.log('props:', props)
const router = useRouter();
const userStore = useUserStore();
const toastStore = useToastStore();

watch(() => props.simulationData, (newVal) => {
  if (!newVal) {
    toastStore.addToast('Session de simulation invalide', ToastType.ERROR)
    router.push({ name: 'home' })
  }
}, { immediate: true })

const loading = ref(false)
const email = ref(props.simulationData?.email || '')
const password = ref('')
const firstName = ref(props.simulationData?.first_name || '')
const lastName = ref(props.simulationData?.last_name || '')

const handleSignup = async () => {
  if (!props.simulationData) {
    toastStore.addToast('Veuillez compléter la simulation avant de vous inscrire', ToastType.ERROR)
    return
  }

  try {
    loading.value = true
    userStore.setLoading(true)

    const result = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })

    if (result.data?.user) {
      const user : User = {
        id: result.data.user.id,
        email: email.value,
        address_id: null,
        phone: null,
        first_name: firstName.value,
        last_name: lastName.value,
        created_at: new Date(),
        updated_at: null,
        role: UserRole.CLIENT,
        profile_photo_url: null,
        username: null,
        aid_simulation_id: props.simulationData?.id || null
      }

      try {
        await supabase.from('users').insert([user])
      } catch (error) {
        throw new Error('Impossible de créer le compte utilisateur')
      }

      userStore.setUser({
        id: result.data.user.id,
        email: result.data.user.email || ''
      })

      toastStore.addToast('Inscription réussie !', ToastType.SUCCESS)
      await router.push({name: 'client-space'})
    } else {
      throw new Error('Impossible de récupérer les informations utilisateur')
    }

  } catch (error) {
    if (error instanceof Error) {
      toastStore.addToast(error.message, ToastType.ERROR)
    } else {
      toastStore.addToast('Une erreur est survenue', ToastType.ERROR)
    }
  } finally {
    loading.value = false
    userStore.setLoading(false)
  }
}
</script>

<template>
  <div class="h-full flex flex-col justify-start">
    <form class="mt-8 space-y-6" @submit.prevent="handleSignup">
      <div class="rounded-md shadow-sm space-y-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            v-model="firstName"
            :readonly="!!simulationData"
            :class="['mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm', { 'bg-gray-50 cursor-not-allowed': simulationData }]"
            placeholder="Votre prénom"
          />
        </div>
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700">Nom</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            v-model="lastName"
            :readonly="!!simulationData"
            :class="['mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm', { 'bg-gray-50 cursor-not-allowed': simulationData }]"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label for="email-address" class="block text-sm font-medium text-gray-700">Adresse email</label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            v-model="email"
            :readonly="!!simulationData"
            :class="['mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm', { 'bg-gray-50 cursor-not-allowed': simulationData }]"
            placeholder="vous@exemple.fr"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            v-model="password"
            class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
            placeholder="Votre mot de passe"
          />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          :disabled="loading"
          :cta="true"
          class="w-full"
        >
          {{ loading ? 'Chargement...' : "S'inscrire" }}
        </Button>
      </div>

      <div v-if="!simulationData" class="text-center mb-4">
        <router-link
          :to="{ name: 'login' }"
          class="text-primary-100 hover:text-primary-200 text-sm font-medium"
        >
          Déjà un compte ? Se connecter
        </router-link>
      </div>
    </form>
  </div>
</template>
