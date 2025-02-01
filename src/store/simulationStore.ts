import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Simulation } from '../models/simulation'
import { simulationService } from '../services/simulationService'
import { storageService } from '../services/storageService'

export const useSimulationStore = defineStore('simulation', () => {
  const currentSimulation = ref<Simulation | null>(null)
  const isLoading = ref(false)

  async function checkExistingSimulation(): Promise<Simulation | null> {
    const token = storageService.getSimulationToken()
    if (!token) return null

    const simulation = await simulationService.getSimulationByToken(token)
    if (!simulation) {
      storageService.clearSimulationToken()
      return null
    }

    const expirationDate = new Date(simulation.expiration_date)
    if (expirationDate < new Date()) {
      storageService.clearSimulationToken()
      return null
    }

    return simulation
  }

  async function createNewSimulation(): Promise<Simulation> {
    const simulation = await simulationService.createSimulation()
    storageService.setSimulationToken(simulation.session_token)
    currentSimulation.value = simulation
    return simulation
  }

  async function updateSimulation(id: string, updateData: Partial<Simulation>): Promise<Simulation> {
    const simulation = await simulationService.updateSimulation(id, updateData)
    currentSimulation.value = simulation
    return simulation
  }

  async function extendSimulationExpiration(simulation: Simulation): Promise<Simulation> {
    const updatedSimulation = await simulationService.extendSimulationExpiration(simulation)
    currentSimulation.value = updatedSimulation
    return updatedSimulation
  }

  return {
    currentSimulation,
    isLoading,
    checkExistingSimulation,
    createNewSimulation,
    updateSimulation,
    extendSimulationExpiration
  }
})
