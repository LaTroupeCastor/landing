<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from "../supabase_client.js";
import { useUserStore } from '../store/userStore';
import { useRouter } from 'vue-router';
import {ToastType, useToastStore} from '../store/toastStore';
import Button from './Button.vue';
import {AuthResponse, AuthTokenResponsePassword} from "@supabase/supabase-js";

const router = useRouter();
const userStore = useUserStore();
const toastStore = useToastStore();

const loading = ref(false)
const email = ref('')
const password = ref('')
const isLogin = ref(true)


const handleAuth = async () => {
  try {
    loading.value = true
    userStore.setLoading(true)

    let result: AuthResponse | AuthTokenResponsePassword | null = null

    if (isLogin.value) {
      result = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })

    } else {
      result = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })
    }


    if (result.error) throw new Error(result.error.message)

    if (result.data?.user) {
      userStore.setUser({
        id: result.data.user.id,
        email: result.data.user.email || ''
      })

      toastStore.addToast(isLogin.value ? 'Connexion réussie !' : 'Inscription réussie !', ToastType.SUCCESS)

      console.log('User:', userStore.user)

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

const toggleAuthMode = () => {
  isLogin.value = !isLogin.value
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ isLogin ? 'Connexion à votre espace' : 'Créer un compte' }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ isLogin ? 'Connectez-vous à votre espace client' : 'Inscrivez-vous pour accéder à votre espace client' }}
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleAuth">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email-address" class="block text-sm font-medium text-gray-700">Adresse email</label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              v-model="email"
              class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
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
              class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
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
            {{ loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire") }}
          </Button>
        </div>

        <div class="text-center">
          <button
            type="button"
            @click="toggleAuthMode"
            class="text-primary-100 hover:text-primary-200 text-sm font-medium"
          >
            {{ isLogin ? "Pas encore de compte ? S'inscrire" : 'Déjà un compte ? Se connecter' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
