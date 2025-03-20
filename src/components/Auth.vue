<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { supabase } from "../supabase_client.js";
import { useToastStore, ToastType } from '../store/toastStore';
import { useRoute, useRouter } from 'vue-router';
import type { Simulation } from "../models/simulation";
import LoginForm from './LoginForm.vue';
import SignupForm from './SignupForm.vue';
import Button from './Button.vue';

const route = useRoute()
const router = useRouter()
const toastStore = useToastStore();
const isLogin = computed(() => route.name === 'login')
const simulationData = ref<Simulation | null>(null)
const isLoadingSimulation = ref(false)

watch(
  () => route.query.simulation,
  async (newVal) => {
    if (newVal && !isLogin.value) {
      try {
        isLoadingSimulation.value = true
        const { data, error } = await supabase
          .from('aid_simulation')
          .select('*')
          .eq('id', newVal)
          .single()

        if (error || !data) {
          throw new Error('Simulation non trouvée')
        }

        if (new Date(data.expiration_date) < new Date()) {
          throw new Error('La simulation a expiré')
        }

        simulationData.value = data as Simulation
        console.log('Simulation data:', simulationData.value)
      } catch (error) {
        console.error('Error fetching simulation:', error)
        toastStore.addToast(
          error instanceof Error ? error.message : 'Erreur lors de la récupération des données de simulation',
          ToastType.ERROR
        )
        simulationData.value = null
        router.push({ name: 'home' })
      } finally {
        isLoadingSimulation.value = false
      }
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="h-screen flex">
    <!-- Partie gauche -->
    <div class="hidden lg:flex flex-1 bg-primary-5 p-12 items-center justify-center">
      <div class="max-w-md text-center space-y-6">
        <img
          src="../assets/signup-left.png"
          alt="Illustration"
          class="mx-auto w-64 h-64 object-contain"
        />
        <h2 class="title-large-medium text-black-100">
          100% de nos clients ont gagné du temps et de l'argent grâce à La Troupe Castor
        </h2>
        <p class="title-small-regular text-black-60">
          Vous allez être contacté sous 24h après votre inscription pour budgétiser concrètement
          vos aides et répondre précisément à vos besoins
        </p>
      </div>
    </div>

    <!-- Partie droite -->
    <div class="flex-1 flex items-center justify-center p-8 bg-white">
      <div class="w-full max-w-md space-y-6">
        <div class="text-center">
          <img
            src="../assets/logo.png"
            alt="Logo"
            class="mx-auto w-40 mb-4"
          />
          <h2 v-if="!isLogin" class="headline-small-medium text-black-100 mb-2">
            Félicitations ! Vous êtes plus qu'à 1 étape de réaliser des économies.
          </h2>
        </div>

        <div v-if="isLogin">
          <div class="text-center mb-8">
            <h3 class="title-small-medium text-black-100">
              Identifiez-vous
            </h3>
            <p class="body-small-regular text-black-60 mt-2">
              Connectez-vous pour accéder à vos chantiers
            </p>
          </div>
          <LoginForm />
        </div>
        <div v-else>
          <template v-if="simulationData">
            <div class="text-center mb-8">
              <h3 class="title-small-medium text-black-100">
                Finalisez votre inscription
              </h3>
              <p class="body-small-regular text-black-60 mt-2">
                Complétez ces informations pour créer votre compte
              </p>
            </div>
            <SignupForm
              :key="simulationData.id"
              :simulationData="simulationData"
            />
          </template>

          <div v-else class="text-center p-8 text-red-500">
            <p>Cette simulation n'est plus valide</p>
            <Button @click="router.push({ name: 'home' })" class="mt-4">
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
