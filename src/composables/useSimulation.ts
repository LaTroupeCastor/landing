import { ref, computed } from 'vue'
import { Simulation } from '../models/simulation'
import { SimulationQuestion, SimulationAnswerModel, TypeSubQuestion } from '../models/simulation_question'
import { useSimulationStore } from '../store/simulationStore'
import { questionService } from '../services/questionService'
import {
  energyLabelTypeFromString,
  fiscalIncomeFromString,
  getBoolFromString,
  occupancyStatusTypeFromString,
  workTypeFromString
} from '../models/simulation'

export function useSimulation() {
  const simulationData = ref<SimulationQuestion[]>([])
  const isLoading = ref(true)
  const error = ref<Error | null>(null)
  const currentQuestionIndex = ref(0)
  const currentSubQuestionIndex = ref(0)
  const currentSimulation = ref<Simulation | null>(null)
  const tempSimulation = ref<Simulation>({
    id: '',
    current_step: 1,
    current_sub_step: 0,
    session_token: '',
    expiration_date: new Date(),
    department: '',
    email: ''
  })

  const simulationStore = useSimulationStore()

  async function loadSimulationData() {
    try {
      isLoading.value = true

      // Vérifier s'il existe une simulation valide
      let simulation = await simulationStore.checkExistingSimulation()

      if (simulation) {
        // Étendre la date d'expiration
        simulation = await simulationStore.extendSimulationExpiration(simulation)
      } else {
        // Créer une nouvelle simulation
        simulation = await simulationStore.createNewSimulation()
      }

      currentSimulation.value = simulation

      // Initialiser la simulation temporaire avec les valeurs actuelles
      tempSimulation.value = { ...currentSimulation.value }

      // Charger les questions
      simulationData.value = await questionService.getQuestions()

      // Restaurer la progression si elle existe
      if (simulation) {
        currentQuestionIndex.value = simulation.current_step - 1
        currentSubQuestionIndex.value = simulation.current_sub_step
      }
    } catch (e) {
      error.value = e as Error
    } finally {
      isLoading.value = false
    }
  }

  async function nextQuestion() {
    if (!hasCurrentAnswer()) return

    const currentQuestion = simulationData.value[currentQuestionIndex.value]
    let nextStep = currentQuestionIndex.value
    let nextSubStep = currentSubQuestionIndex.value

    if (currentSubQuestionIndex.value < currentQuestion.subQuestions.length - 1) {
      nextSubStep++
    } else if (currentQuestionIndex.value < simulationData.value.length - 1) {
      nextStep++
      nextSubStep = 0
    }

    if (currentSimulation.value) {
      const updateData = {
        ...tempSimulation.value,
        current_step: nextStep + 1,
        current_sub_step: nextSubStep
      }

      const updatedSimulation = await simulationStore.updateSimulation(
        currentSimulation.value.id,
        updateData
      )

      if (updatedSimulation) {
        currentSimulation.value = updatedSimulation
        tempSimulation.value = { ...updatedSimulation }
      }
    }

    currentQuestionIndex.value = nextStep
    currentSubQuestionIndex.value = nextSubStep
  }

  async function previousQuestion() {
    if (currentSubQuestionIndex.value > 0) {
      currentSubQuestionIndex.value--
    } else if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--
      currentSubQuestionIndex.value = simulationData.value[currentQuestionIndex.value].subQuestions.length - 1
    }

    if (currentSimulation.value) {
      const updatedSimulation = await simulationStore.updateSimulation(
        currentSimulation.value.id,
        {
          current_step: currentQuestionIndex.value + 1,
          current_sub_step: currentSubQuestionIndex.value
        }
      )

      if (updatedSimulation) {
        currentSimulation.value = updatedSimulation
        tempSimulation.value = { ...updatedSimulation }
      }
    }
  }

  function isAnswerSelected(subQuestionType: TypeSubQuestion, answerValue: string): boolean {
    if (!tempSimulation.value) return false

    switch(subQuestionType) {
      case TypeSubQuestion.OCCUPANCY_STATUS:
        return tempSimulation.value.occupancy_status === occupancyStatusTypeFromString(answerValue)
      case TypeSubQuestion.ENERGY_LABEL:
        return tempSimulation.value.energy_label === energyLabelTypeFromString(answerValue)
      case TypeSubQuestion.FISCAL_INCOME:
        return tempSimulation.value.fiscal_income === fiscalIncomeFromString(answerValue)
      case TypeSubQuestion.WORK_TYPE:
        return tempSimulation.value.work_type === workTypeFromString(answerValue)
      case TypeSubQuestion.ENERGY_DIAGNOSTIC:
        return tempSimulation.value.energy_diagnostic_done === getBoolFromString(answerValue)
      case TypeSubQuestion.BUILDING_AGE:
        return tempSimulation.value.building_age_over_15 === getBoolFromString(answerValue)
      case TypeSubQuestion.BIOSOURCED:
        return tempSimulation.value.biosourced_materials === getBoolFromString(answerValue)
      case TypeSubQuestion.ANAH:
        return tempSimulation.value.anah_aid_last_5_years === getBoolFromString(answerValue)
      default:
        return false
    }
  }

  async function selectAnswer(subQuestionType: TypeSubQuestion, answer: SimulationAnswerModel) {
    if (!tempSimulation.value) return

    switch(subQuestionType) {
      case TypeSubQuestion.OCCUPANCY_STATUS:
        tempSimulation.value.occupancy_status = occupancyStatusTypeFromString(answer.value)
        break
      case TypeSubQuestion.ENERGY_LABEL:
        tempSimulation.value.energy_label = energyLabelTypeFromString(answer.value)
        break
      case TypeSubQuestion.FISCAL_INCOME:
        tempSimulation.value.fiscal_income = fiscalIncomeFromString(answer.value)
        break
      case TypeSubQuestion.WORK_TYPE:
        tempSimulation.value.work_type = workTypeFromString(answer.value)
        break
      case TypeSubQuestion.ENERGY_DIAGNOSTIC:
        tempSimulation.value.energy_diagnostic_done = getBoolFromString(answer.value)
        break
      case TypeSubQuestion.BUILDING_AGE:
        tempSimulation.value.building_age_over_15 = getBoolFromString(answer.value)
        break
      case TypeSubQuestion.BIOSOURCED:
        tempSimulation.value.biosourced_materials = getBoolFromString(answer.value)
        break
      case TypeSubQuestion.ANAH:
        tempSimulation.value.anah_aid_last_5_years = getBoolFromString(answer.value)
        break
    }

    if (currentSimulation.value) {
      const updatedSimulation = await simulationStore.updateSimulation(
        currentSimulation.value.id,
        tempSimulation.value
      )

      if (updatedSimulation) {
        currentSimulation.value = updatedSimulation
      }
    }
  }

  function isProgressActive(index: number) {
    return index <= currentSubQuestionIndex.value
  }

  function isLastQuestion(): boolean {
    return currentQuestionIndex.value === simulationData.value.length - 1 &&
           currentSubQuestionIndex.value === simulationData.value[currentQuestionIndex.value].subQuestions.length - 1
  }

  function hasCurrentAnswer(): boolean {
    if (!simulationData.value || !tempSimulation.value) return false

    const currentQuestion = simulationData.value[currentQuestionIndex.value]
    if (!currentQuestion) return false

    const currentSubQuestion = currentQuestion.subQuestions[currentSubQuestionIndex.value]
    if (!currentSubQuestion) return false

    switch(currentSubQuestion.type_sub_questions) {
      case TypeSubQuestion.OCCUPANCY_STATUS:
        return tempSimulation.value.occupancy_status != null
      case TypeSubQuestion.ENERGY_LABEL:
        return tempSimulation.value.energy_label != null
      case TypeSubQuestion.FISCAL_INCOME:
        return tempSimulation.value.fiscal_income != null
      case TypeSubQuestion.WORK_TYPE:
        return tempSimulation.value.work_type != null
      case TypeSubQuestion.ENERGY_DIAGNOSTIC:
        return tempSimulation.value.energy_diagnostic_done != null
      case TypeSubQuestion.BUILDING_AGE:
        return tempSimulation.value.building_age_over_15 != null
      case TypeSubQuestion.BIOSOURCED:
        return tempSimulation.value.biosourced_materials != null
      case TypeSubQuestion.ANAH:
        return tempSimulation.value.anah_aid_last_5_years != null
      default:
        return false
    }
  }

  const isNextDisabled = computed(() => {
    return isLastQuestion() || !hasCurrentAnswer()
  })

  return {
    simulationData,
    isLoading,
    error,
    currentQuestionIndex,
    currentSubQuestionIndex,
    currentSimulation,
    tempSimulation,
    loadSimulationData,
    nextQuestion,
    previousQuestion,
    isAnswerSelected,
    selectAnswer,
    isProgressActive,
    isLastQuestion,
    isNextDisabled
  }
}
