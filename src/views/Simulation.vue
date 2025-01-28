<script setup lang="ts">
import StepIndicator from "../components/StepIndicator.vue";
import {onMounted, ref} from 'vue';
import {fetchSimulationData} from "../models/simulations_data.ts";
import {SimulationQuestion} from "../models/simulation_question.ts";

const simulationData = ref<SimulationQuestion[]>([]);
const isLoading = ref(true);
const error = ref<Error | null>(null);

async function loadSimulationData() {
  try {
    simulationData.value = await fetchSimulationData();
    console.log(simulationData.value);
  } catch (e) {
    error.value = e as Error;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadSimulationData();
});

</script>

<template>
  <div class="h-screen flex">
    <div class="bg-primary-5 w-4/12 h-full">
      <div class="mx-20 flex flex-col items-start">
        <img src="../assets/tete.svg" class="h-14 mb-20 mt-10" alt="Tete Logo" />
        <p class="title-medium-medium mb-1">Simulateur d'éligibilité aux aides</p>
        <p class="body-small-regular text-black-40">Temps estimé : 5mn</p>
        <div class="flex flex-col gap-16 mt-14">
          <StepIndicator
            v-for="(step, index) in steps"
            :key="step.number"
            :title="step.title"
            :number="step.number"
            :current-step="currentStep"
            :is-last="index === steps.length - 1"
          />
        </div>
      </div>
    </div>
  </div>
</template>
