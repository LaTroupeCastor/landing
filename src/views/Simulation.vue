<script setup lang="ts">
import StepIndicator from "../components/StepIndicator.vue"
import SimulationAnswer from "../components/SimulationAnswer.vue"
import Button from "../components/Button.vue"
import {onMounted, ref} from 'vue'
import { useSimulation } from '../composables/useSimulation'
import SimulationFinalForm from "../components/SimulationFinalForm.vue";
import {supabase} from "../supabase_client.ts";
import {ToastType} from "../store/toastStore.ts";
import { useToastStore } from '../store/toastStore';

const {
  simulationData,
  isLoading,
  error,
  currentSimulation,
  currentQuestionIndex,
  currentSubQuestionIndex,
  loadSimulationData,
  nextQuestion,
  previousQuestion,
  isAnswerSelected,
  selectAnswer,
  isProgressActive,
  isNextDisabled,
  shouldShowFinalForm
} = useSimulation()

const loading = ref(false);
const toastStore = useToastStore();

const handleFormSubmit = async (data: { firstName: string; lastName: string; email: string }) => {
  //update simulation data
  await updateSimulationData(data);

  //check eligibility
  await checkEligibility();
}

const updateSimulationData = async (data: { firstName: string; lastName: string; email: string }) => {
  loading.value = true;
  try {
    //Insert first name, last name and email in the database
    const { data: resInsertUser, error } = await supabase.from('aid_simulation').update({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
    }).eq('id', currentSimulation.value?.id);



    if (error) {
      toastStore.addToast('Erreur lors de l\'envoi de l\'email', ToastType.ERROR);
      return;
    }

    toastStore.addToast('Message envoyé avec succès', ToastType.SUCCESS);
    console.log(resInsertUser);

  } catch (error) {
    toastStore.addToast('Une erreur est survenue lors de l\'envoi du message', ToastType.ERROR);
  } finally {
    loading.value = false;
  }
}

const checkEligibility = async () => {
  loading.value = true;
  try {
    const { data: resCheckEligibility, error } = await supabase.functions.invoke('check_eligibility', {
      body: JSON.stringify({
        simulation_id: currentSimulation.value?.id,
      }),
      method: 'POST',
    });

    if (error) {
      toastStore.addToast('Erreur lors de l\'envoi de l\'email', ToastType.ERROR);
      return;
    }

    toastStore.addToast('Message envoyé avec succès', ToastType.SUCCESS);
    console.log(resCheckEligibility);
  } catch (error) {
    toastStore.addToast('Une erreur est survenue lors de l\'envoi du message', ToastType.ERROR);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadSimulationData()
})
</script>

<template>
  <div class="h-screen flex">
    <!-- Left sidebar with main questions -->
    <div class="bg-primary-5 w-[30%] h-full">
      <div class="mx-20 flex flex-col items-start">
        <img src="../assets/tete.svg" class="h-14 mb-12 mt-10" alt="Tete Logo" />
        <p class="title-medium-medium mb-1">Simulateur d'éligibilité aux aides</p>
        <p class="body-small-regular text-black-40">Temps estimé : 5mn</p>
        <div class="flex flex-col mt-14">
          <StepIndicator
            v-for="(question, index) in simulationData"
            :key="question.id"
            :number="question.step_number"
            :title="question.title"
            :current-step="currentQuestionIndex + 1"
            :is-last="index === simulationData.length - 1"
            :class="{
              'cursor-pointer': index <= currentQuestionIndex,
              'cursor-not-allowed opacity-50': index > currentQuestionIndex
            }"
            @click="
              index <= currentQuestionIndex && (currentQuestionIndex = index, currentSubQuestionIndex = 0)
            "
          />
        </div>
      </div>
    </div>

    <!-- Right content -->
    <div class="flex-1 p-8 flex items-center justify-center" v-if="!isLoading && !error">
      <SimulationFinalForm
        v-if="shouldShowFinalForm()"
        @back="previousQuestion"
       :on-submit="handleFormSubmit"/>
      <div v-else-if="simulationData[currentQuestionIndex]?.subQuestions[currentSubQuestionIndex]" class="max-w-3xl w-full">
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
            :disabled="isNextDisabled"
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
