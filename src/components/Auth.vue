<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { supabase } from "../supabase_client.js";
import { useUserStore } from '../store/userStore';
import { useRouter, useRoute } from 'vue-router';
import {ToastType, useToastStore} from '../store/toastStore';
import Button from './Button.vue';
import {AuthResponse, AuthTokenResponsePassword} from "@supabase/supabase-js";
import {User, UserRole} from "../models/user.ts";
import type { Simulation } from "../models/simulation";

const isPro = ref(false)

const router = useRouter();
const userStore = useUserStore();
const toastStore = useToastStore();

const loading = ref(false)
const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const route = useRoute()
const isLogin = computed(() => route.name === 'login')
const simulationData = ref<Simulation | null>(null)

onMounted(async () => {
  console.log(route.params.simulation)
  if (route.query.simulation && !isLogin.value) {
    try {
      console.log(route.query.simulation)
      const { data, error } = await supabase
        .from('aid_simulation')
        .select('*')
        .eq('id', route.query.simulation)
        .single()

      if (error) throw error

      if (data) {
        console.log(data)
        simulationData.value = data as Simulation
        email.value = data.email || ''
        firstName.value = data.first_name || ''
        lastName.value = data.last_name || ''
      }
    } catch (error) {
      console.error('Error fetching simulation:', error)
      toastStore.addToast('Erreur lors de la récupération des données de simulation', ToastType.ERROR)
    }
  }
})


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

      const user : User = {
        id: result.data?.user?.id || '',
        email: email.value,
        address_id: null,
        phone: null,
        first_name: lastName.value,
        last_name: firstName.value,
        created_at: new Date(),
        updated_at : null,
        role: UserRole.CLIENT,
        profile_photo_url: null,
        username: null,
        aid_simulation_id: typeof route.query.simulation === 'string' ? route.query.simulation : null
      }

      try {
        await supabase.from('users').insert([user])
      } catch (error) {
        throw new Error('Impossible de créer le compte utilisateur')
      }
    }

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

</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-50 relative bg-primary-5">

    <!-- Ajout de l'image à gauche -->
    <img
      src="../assets/beavy_seul.png"
      alt="Castor"
      class="hidden lg:block w-80 h-auto absolute left-0 bottom-0"
    />

    <div class="w-[25%] min-w-[350px] h-[85%] mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col">
      <img
          src="../assets/logo.png"
          alt="Logo"
          class="mx-auto w-64"/>

      <!-- Titre et description -->
      <div v-if="!isPro" class="text-left">
        <h2 class="mt-8 headline-small-medium text-black-100">
          {{ isLogin ? 'Identifiez-vous' : 'Créer un compte' }}
        </h2>
        <p class="mt-2 body-small-regular text-black-40">
          {{ isLogin ? 'Connectez-vous pour accèder à vos chantiers' : 'Inscrivez-vous pour accéder à votre espace client' }}
        </p>
      </div>

      <!-- Sélecteur type compte -->
      <div class="bg-black-5 p-1 rounded-lg mt-4">
        <div class="relative flex gap-1">
          <!-- Fond de sélection -->
          <div
            :class="[
              isPro ? 'translate-x-full' : 'translate-x-0',
              'absolute h-full w-1/2 bg-white rounded-lg transition-transform duration-200'
            ]"
          ></div>

          <!-- Boutons -->
          <button
            @click="isPro = false"
            class="flex-1 z-10 py-3 body-small-regular font-medium transition-colors"
            :class="!isPro ? 'text-black-100' : 'text-black-60'"
          >
            Particulier
          </button>

          <button
            @click="isPro = true"
            class="flex-1 z-10 py-3 body-small-regular font-medium transition-colors"
            :class="isPro ? 'text-black-100' : 'text-black-60'"
          >
            Professionnel
          </button>
        </div>
      </div>

      <!-- Section Professionnel -->
      <div v-if="isPro" class="text-center py-6 text-gray-500 flex-1 flex items-center justify-center">
        Fonctionnalité prochainement disponible
      </div>

      <!-- Formulaire existant (ajouter v-else) -->
      <div v-else class="h-full flex flex-col justify-start">
        <!-- Sélecteur type compte -->
        <form class="mt-8 space-y-6" @submit.prevent="handleAuth">
        <div class="rounded-md shadow-sm space-y-4">
          <template v-if="!isLogin">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">Prénom</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                v-model="firstName"
                class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
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
                class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Votre nom"
              />
            </div>
          </template>
          <div>
            <label for="email-address" class="block text-sm font-medium text-gray-700">Adresse email</label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              v-model="email"
              :readonly="!!simulationData"
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
            {{ loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire") }}
          </Button>
        </div>

        <div class="text-center mb-4">
          <router-link
            v-if="isLogin"
            to="/simulation"
            class="text-primary-100 hover:text-primary-200 text-sm font-medium"
          >
            Pas encore de compte ? Commencer une simulation
          </router-link>
          <router-link
            v-else
            :to="{ name: 'login' }"
            class="text-primary-100 hover:text-primary-200 text-sm font-medium"
          >
            Déjà un compte ? Se connecter
          </router-link>
        </div>
      </form>
      </div>
    </div>
  </div>
</template>
