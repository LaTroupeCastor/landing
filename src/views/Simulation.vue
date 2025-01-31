<script setup lang="ts">
import StepIndicator from "../components/StepIndicator.vue";
import SimulationAnswer from "../components/SimulationAnswer.vue";
import { onMounted, ref } from 'vue';
import { createNewSimulation, fetchSimulationData } from "../models/simulations_data.ts";
import { supabase } from '../supabase_client';
import {SimulationAnswerModel, SimulationQuestion, TypeSubQuestion} from "../models/simulation_question.ts";
import Button from "../components/Button.vue";
import {
  energyLabelTypeFromString, fiscalIncomeFromString, getBoolFromString,
  occupancyStatusTypeFromString,
  Simulation, workTypeFromString
} from "../models/simulation.ts";
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

    // Restaurer la progression si elle existe
    if (simulation) {
      currentQuestionIndex.value = simulation.current_step - 1;
      currentSubQuestionIndex.value = simulation.current_sub_step;
    }
  } catch (e) {
    error.value = e as Error;
  } finally {
    isLoading.value = false;
  }
}

async function nextQuestion() {
  const currentQuestion = simulationData.value[currentQuestionIndex.value];
  let nextStep = currentQuestionIndex.value;
  let nextSubStep = currentSubQuestionIndex.value;

  if (currentSubQuestionIndex.value < currentQuestion.subQuestions.length - 1) {
    nextSubStep++;
  } else if (currentQuestionIndex.value < simulationData.value.length - 1) {
    nextStep++;
    nextSubStep = 0;
  }

  // Envoyer les réponses temporaires et mettre à jour la progression
  if (currentSimulation.value) {
    const updateData = {
      ...(Object.keys(tempAnswers.value).length > 0 ? tempAnswers.value : {}),
      current_step: nextStep + 1,
      current_sub_step: nextSubStep
    };

    const { error } = await supabase
      .from('aid_simulation')
      .update(updateData)
      .eq('id', currentSimulation.value.id);

    if (error) {
      console.error('Error updating simulation:', error);
    } else {
      // Mettre à jour currentSimulation avec les nouvelles réponses
      currentSimulation.value = {
        ...currentSimulation.value,
        ...tempAnswers.value,
        current_step: nextStep + 1,
        current_sub_step: nextSubStep
      };
      // Réinitialiser les réponses temporaires
      tempAnswers.value = {};
    }
  }

  // Mettre à jour les index après la mise à jour réussie
  currentQuestionIndex.value = nextStep;
  currentSubQuestionIndex.value = nextSubStep;
}

async function previousQuestion() {
  if (currentSubQuestionIndex.value > 0) {
    currentSubQuestionIndex.value--;
  } else if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    currentSubQuestionIndex.value = simulationData.value[currentQuestionIndex.value].subQuestions.length - 1;
  }

  // Update simulation progress in database
  if (currentSimulation.value) {
    const { error } = await supabase
      .from('aid_simulation')
      .update({
        current_step: currentQuestionIndex.value + 1,
        current_sub_step: currentSubQuestionIndex.value
      })
      .eq('id', currentSimulation.value.id);

    if (error) {
      console.error('Error updating simulation progress:', error);
    }
  }
}

function isAnswerSelected(subQuestionType: TypeSubQuestion, answerValue: string): boolean {
  // Si on a une réponse temporaire, on l'utilise en priorité
  if (Object.keys(tempAnswers.value).length > 0) {
    switch(subQuestionType) {
      case TypeSubQuestion.OCCUPANCY_STATUS:
        return tempAnswers.value.occupancy_status === occupancyStatusTypeFromString(answerValue);
      case TypeSubQuestion.ENERGY_LABEL:
        return tempAnswers.value.energy_label === energyLabelTypeFromString(answerValue);
      case TypeSubQuestion.FISCAL_INCOME:
        return tempAnswers.value.fiscal_income === fiscalIncomeFromString(answerValue);
      case TypeSubQuestion.WORK_TYPE:
        return tempAnswers.value.work_type === workTypeFromString(answerValue);
      case TypeSubQuestion.ENERGY_DIAGNOSTIC:
        return tempAnswers.value.energy_diagnostic_done === getBoolFromString(answerValue);
      case TypeSubQuestion.BUILDING_AGE:
        return tempAnswers.value.building_age_over_15 === getBoolFromString(answerValue);
      case TypeSubQuestion.BIOSOURCED:
        return tempAnswers.value.biosourced_materials === getBoolFromString(answerValue);
      case TypeSubQuestion.ANAH:
        return tempAnswers.value.anah_aid_last_5_years === getBoolFromString(answerValue);
      default:
        return false;
    }
  }
  
  // Sinon on utilise la réponse en base
  if (currentSimulation.value) {
    switch(subQuestionType) {
      case TypeSubQuestion.OCCUPANCY_STATUS:
        return currentSimulation.value.occupancy_status === occupancyStatusTypeFromString(answerValue);
      case TypeSubQuestion.ENERGY_LABEL:
        return currentSimulation.value.energy_label === energyLabelTypeFromString(answerValue);
      case TypeSubQuestion.FISCAL_INCOME:
        return currentSimulation.value.fiscal_income === fiscalIncomeFromString(answerValue);
      case TypeSubQuestion.WORK_TYPE:
        return currentSimulation.value.work_type === workTypeFromString(answerValue);
      case TypeSubQuestion.ENERGY_DIAGNOSTIC:
        return currentSimulation.value.energy_diagnostic_done === getBoolFromString(answerValue);
      case TypeSubQuestion.BUILDING_AGE:
        return currentSimulation.value.building_age_over_15 === getBoolFromString(answerValue);
      case TypeSubQuestion.BIOSOURCED:
        return currentSimulation.value.biosourced_materials === getBoolFromString(answerValue);
      case TypeSubQuestion.ANAH:
        return currentSimulation.value.anah_aid_last_5_years === getBoolFromString(answerValue);
      default:
        return false;
    }
  }
  
  return false;
}

// Stockage temporaire des réponses
const tempAnswers = ref<Partial<Simulation>>({});

function selectAnswer(subQuestionType: TypeSubQuestion, answer: SimulationAnswerModel) {
  // Réinitialiser tempAnswers pour ne garder que la réponse courante
  tempAnswers.value = {};
  
  switch(subQuestionType) {
    case TypeSubQuestion.OCCUPANCY_STATUS:
      tempAnswers.value.occupancy_status = occupancyStatusTypeFromString(answer.value);
      break;
    case TypeSubQuestion.ENERGY_LABEL:
      tempAnswers.value.energy_label = energyLabelTypeFromString(answer.value);
      break;
    case TypeSubQuestion.FISCAL_INCOME:
      tempAnswers.value.fiscal_income = fiscalIncomeFromString(answer.value);
      break;
    case TypeSubQuestion.WORK_TYPE:
      tempAnswers.value.work_type = workTypeFromString(answer.value);
      break;
    case TypeSubQuestion.ENERGY_DIAGNOSTIC:
      tempAnswers.value.energy_diagnostic_done = getBoolFromString(answer.value);
      break;
    case TypeSubQuestion.BUILDING_AGE:
      tempAnswers.value.building_age_over_15 = getBoolFromString(answer.value);
      break;
    case TypeSubQuestion.BIOSOURCED:
      tempAnswers.value.biosourced_materials = getBoolFromString(answer.value);
      break;
    case TypeSubQuestion.ANAH:
      tempAnswers.value.anah_aid_last_5_years = getBoolFromString(answer.value);
      break;
  }
}

onMounted(() => {
  loadSimulationData();
});

const isProgressActive = (index: number) => {
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
            :class="{
              'cursor-pointer': Object.keys(userAnswers).length > 0 && index <= Math.max(...simulationData.map((_, i) =>
                simulationData[i].subQuestions.every(sq => userAnswers[sq.id]) ? i : -1
              )),
              'cursor-not-allowed opacity-50': Object.keys(userAnswers).length === 0 || index > Math.max(...simulationData.map((_, i) =>
                simulationData[i].subQuestions.every(sq => userAnswers[sq.id]) ? i : -1
              ))
            }"
            @click="
              index <= Math.max(...simulationData.map((_, i) =>
                simulationData[i].subQuestions.every(sq => userAnswers[sq.id]) ? i : -1
              )) && (currentQuestionIndex = index, currentSubQuestionIndex = 0)
            "
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
            <div v-for="(_, index) in simulationData[currentQuestionIndex].subQuestions"
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
              @click="selectAnswer(simulationData[currentQuestionIndex].subQuestions[currentSubQuestionIndex].type_sub_questions, answer)"
            >
              <SimulationAnswer
                :content="answer.content"
                :is-selected="isAnswerSelected(simulationData[currentQuestionIndex].subQuestions[currentSubQuestionIndex].type_sub_questions, answer.value)"
              />
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between mt-20">
          <Button :disabled="currentQuestionIndex === 0 && currentSubQuestionIndex === 0" leading-icon="./src/assets/previous.svg" class="text-primary-100 title-small-sbold" @click="previousQuestion">Précédent</Button>
          <Button
            :cta=true
            :disabled="
              (currentQuestionIndex === simulationData.length - 1 &&
              currentSubQuestionIndex === simulationData[currentQuestionIndex].subQuestions.length - 1)
            "
            trailing-icon="./src/assets/next.svg"
            class="text-primary-100 title-small-sbold"
            @click="nextQuestion">
            Suivant
          </Button>
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
