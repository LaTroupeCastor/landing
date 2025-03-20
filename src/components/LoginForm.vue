<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from "../supabase_client.js";
import { useUserStore } from '../store/userStore';
import { useRouter } from 'vue-router';
import { ToastType, useToastStore } from '../store/toastStore';
import Button from './Button.vue';

const router = useRouter();
const userStore = useUserStore();
const toastStore = useToastStore();

const loading = ref(false)
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    userStore.setLoading(true)

    const result = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (result.data?.user) {
      userStore.setUser({
        id: result.data.user.id,
        email: result.data.user.email || ''
      })

      toastStore.addToast('Connexion réussie !', ToastType.SUCCESS)
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
    <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
      <div class="rounded-md shadow-sm space-y-4">
        <div>
          <label for="email-address" class="block text-sm font-medium text-gray-700">Adresse email</label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            v-model="email"
            class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
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
          {{ loading ? 'Chargement...' : 'Se connecter' }}
        </Button>
      </div>

      <div class="text-center mb-4">
        <router-link
          to="/simulation"
          class="text-primary-100 hover:text-primary-200 text-sm font-medium"
        >
          Pas encore de compte ? Commencer une simulation
        </router-link>
      </div>
    </form>
  </div>
</template>
