<script setup lang="ts">
import StepIndicator from "../components/StepIndicator.vue";
import SimulationAnswer from "../components/SimulationAnswer.vue";
import { onMounted, ref } from 'vue';
import { createNewSimulation, fetchSimulationData } from "../models/simulations_data.ts";
import { SimulationQuestion } from "../models/simulation_question.ts";
import Button from "../components/Button.vue";
import { Simulation } from "../models/simulation.ts";
import { useSimulationStore } from "../store/simulationStore";

const simulationData = ref<SimulationQuestion[]>([]);
const isLoading = ref(true);
const error = ref<Error | null>(null);
const currentQuestionIndex = ref(0);
const currentSubQuestionIndex = ref(0);
const userAnswers = ref<Record<string, string>>({});
const currentSimulation = ref<Simulation | null>(null);

const simulationStore = useSimulationStore();

async function loadSimulationData() {
  try {
    // Vérifier s'il existe une simulation valide
    let simulation = await simulationStore.checkExistingSimulation();
    
    if (simulation) {
      // Étendre la date d'expiration
      simulation = await simulationStore.extendSimulationExpiration(simulation);
      currentSimulation.value = simulation;
    } else {
      // Créer une nouvelle simulation
      const newSimulation = await createNewSimulation();
      simulationStore.setStoredToken(newSimulation.session_token);
      currentSimulation.value = newSimulation;
    }
    
    // Charger les questions
    simulationData.value = await fetchSimulationData();
  } catch (e) {
    error.value = e as Error;
  } finally {
    isLoading.value = false;
  }
}

function nextQuestion() {
  const currentQuestion = simulationData.value[currentQuestionIndex.value];
  if (currentSubQuestionIndex.value < currentQuestion.subQuestions.length - 1) {
    currentSubQuestionIndex.value++;
  } else if (currentQuestionIndex.value < simulationData.value.length - 1) {
    currentQuestionIndex.value++;
    currentSubQuestionIndex.value = 0;
  }
}

function previousQuestion() {
  if (currentSubQuestionIndex.value > 0) {
    currentSubQuestionIndex.value--;
  } else if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    currentSubQuestionIndex.value = simulationData.value[currentQuestionIndex.value].subQuestions.length - 1;
  }
}

function selectAnswer(subQuestionId: string, answerId: string) {
  userAnswers.value[subQuestionId] = answerId;
}

onMounted(() => {
  loadSimulationData();
});

const isProgressActive = (index: number) => {
  console.log(`Checking progress for index ${index}, currentSubQuestionIndex: ${currentSubQuestionIndex.value}`);
  console.log(`Is active: ${index <= currentSubQuestionIndex.value}`);
  return index <= currentSubQuestionIndex.value;
}
</script>

<template>
  <div class="h-screen flex">
    <!-- Left sidebar with main questions -->
    <div class="bg-primary-5 w-1/4 h-full">
      <div class="mx-20 flex flex-col items-start">
        <img src="../assets/tete.svg" class="h-14 mb-12 mt-10" alt="Tete Logo" />
        <p class="title-medium-medium mb-1">Simulateur d'éligibilité aux aides</p>
        <p class="body-small-regular text-black-40">Temps estimé : 5mn</p>
        <div class="flex flex-col gap-16 mt-14">
          <StepIndicator
            v-for="(question, index) in simulationData"
            :key="question.id"
            :number="question.step_number"
            :title="question.title"
            :current-step="currentQuestionIndex + 1"
            :is-last="index === simulationData.length - 1"
            class="cursor-pointer"
            @click="currentQuestionIndex = index; currentSubQuestionIndex = 0"
          />
        </div>
      </div>
    </div>

    <!-- Right content with sub-questions -->
    <div class="flex-1 p-8 flex items-center justify-center" v-if="!isLoading && !error">
      <div v-if="simulationData[currentQuestionIndex]?.subQuestions[currentSubQuestionIndex]" class="max-w-3xl w-full">
        <!-- Progress indicator -->
        <div class="flex justify-center mb-16">
          <div class="flex gap-2 justify-center">
            <div v-for="(subQuestion, index) in simulationData[currentQuestionIndex].subQuestions"
                 :key="index"
                 class="h-2 w-24 rounded-xl"
               :class="isProgressActive(index) ? 'bg-primary-100' : 'bg-black-5'">
          </div>
        </div>
      </div>

        <!-- Current question title -->
        <h2 class="headline-small-sbold mb-6 flex justify-center">
          {{ simulationData[currentQuestionIndex].title }}
        </h2>

        <!-- Current sub-question -->
        <div class="mb-8">
          <h3 class="title-medium-regular mb-16 flex justify-center">
            {{ simulationData[currentQuestionIndex].subQuestions[currentSubQuestionIndex].content }}
          </h3>

          <!-- Answers -->
          <div class="flex flex-row gap-4 justify-center">
            <div
              v-for="answer in simulationData[currentQuestionIndex].subQuestions[currentSubQuestionIndex].answers"
              :key="answer.id"
              @click="selectAnswer(simulationData[currentQuestionIndex].subQuestions[currentSubQuestionIndex].id, answer.id)"
            >
              <SimulationAnswer
                :content="answer.content"
                :is-selected="userAnswers[simulationData[currentQuestionIndex].subQuestions[currentSubQuestionIndex].id] === answer.id"
              />
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between mt-20">
          <Button :disabled="currentQuestionIndex === 0 && currentSubQuestionIndex === 0" leading-icon="./src/assets/previous.svg" class="text-primary-100 title-small-sbold" @click="previousQuestion">Précédent</Button>
          <Button :cta=true :disabled="currentQuestionIndex === simulationData.length - 1 && currentSubQuestionIndex === simulationData[currentQuestionIndex].subQuestions.length - 1" trailing-icon="./src/assets/next.svg" class="text-primary-100 title-small-sbold" @click="nextQuestion">Suivant</Button>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else-if="isLoading" class="flex-1 flex items-center justify-center">
      Chargement...
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="flex-1 flex items-center justify-center text-red-500">
      Une erreur est survenue: {{ error.message }}
    </div>
  </div>
</template>
