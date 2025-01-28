<script setup lang="ts">
import StepIndicator from "../components/StepIndicator.vue";
import { onMounted, ref } from 'vue';
import { fetchSimulationData } from "../models/simulations_data.ts";
import { SimulationQuestion } from "../models/simulation_question.ts";

const simulationData = ref<SimulationQuestion[]>([]);
const isLoading = ref(true);
const error = ref<Error | null>(null);
const currentQuestionIndex = ref(0);
const currentSubQuestionIndex = ref(0);
const userAnswers = ref<Record<string, string>>({});

async function loadSimulationData() {
  try {
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
</script>

<template>
  <div class="h-screen flex">
    <!-- Left sidebar with main questions -->
    <div class="bg-primary-5 w-4/12 h-full">
      <div class="mx-20 flex flex-col items-start">
        <img src="../assets/tete.svg" class="h-14 mb-20 mt-10" alt="Tete Logo" />
        <p class="title-medium-medium mb-1">Simulateur d'éligibilité aux aides</p>
        <p class="body-small-regular text-black-40">Temps estimé : 5mn</p>
        <div class="flex flex-col gap-16 mt-14">
          <div v-for="(question, index) in simulationData" 
               :key="question.id"
               :class="{ 'active': currentQuestionIndex === index }"
               class="cursor-pointer"
               @click="currentQuestionIndex = index; currentSubQuestionIndex = 0">
            <p class="font-medium">{{ question.title }}</p>
            <p class="text-sm text-gray-600">{{ question.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right content with sub-questions -->
    <div class="flex-1 p-8" v-if="!isLoading && !error">
      <div v-if="simulationData[currentQuestionIndex]?.subQuestions[currentSubQuestionIndex]" class="max-w-2xl mx-auto">
        <!-- Progress indicator -->
        <div class="flex justify-between mb-8">
          <div v-for="(subQuestion, index) in simulationData[currentQuestionIndex].subQuestions" 
               :key="index"
               class="h-2 bg-gray-200 flex-1 mx-1"
               :class="{ 'bg-primary-500': index <= currentSubQuestionIndex }">
          </div>
        </div>

        <!-- Current sub-question -->
        <div class="mb-8">
          <h3 class="text-xl font-medium mb-6">
            {{ simulationData[currentQuestionIndex].subQuestions[currentSubQuestionIndex].content }}
          </h3>

          <!-- Answers -->
          <div class="grid gap-4">
            <button
              v-for="answer in simulationData[currentQuestionIndex].subQuestions[currentSubQuestionIndex].answers"
              :key="answer.id"
              @click="selectAnswer(simulationData[currentQuestionIndex].subQuestions[currentSubQuestionIndex].id, answer.id)"
              :class="{ 'bg-primary-100': userAnswers[simulationData[currentQuestionIndex].subQuestions[currentSubQuestionIndex].id] === answer.id }"
              class="p-4 border rounded-lg text-left hover:bg-gray-50">
              {{ answer.content }}
            </button>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between mt-8">
          <button 
            @click="previousQuestion"
            :disabled="currentQuestionIndex === 0 && currentSubQuestionIndex === 0"
            class="px-6 py-2 border rounded-lg">
            Précédent
          </button>
          <button 
            @click="nextQuestion"
            class="px-6 py-2 bg-primary-500 text-white rounded-lg">
            Suivant
          </button>
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

<style scoped>
.active {
  color: theme('colors.primary.500');
}
</style>
