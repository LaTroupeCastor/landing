const SIMULATION_TOKEN_KEY = 'simulation_token'

export const storageService = {
  getSimulationToken(): string | null {
    return localStorage.getItem(SIMULATION_TOKEN_KEY)
  },

  setSimulationToken(token: string): void {
    localStorage.setItem(SIMULATION_TOKEN_KEY, token)
  },

  clearSimulationToken(): void {
    localStorage.removeItem(SIMULATION_TOKEN_KEY)
  }
}
