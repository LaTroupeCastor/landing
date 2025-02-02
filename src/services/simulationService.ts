import { supabase } from '../supabase_client'
import { Simulation } from '../models/simulation'

export const simulationService = {
  async getSimulationByToken(token: string): Promise<Simulation | null> {
    const { data, error } = await supabase
      .from('aid_simulation')
      .select('*')
      .eq('session_token', token)
      .single()

    if (error || !data) return null
    return data as Simulation
  },

  async createSimulation(): Promise<Simulation> {
    const newExpirationDate = new Date()
    newExpirationDate.setHours(newExpirationDate.getHours() + 24)

    const sessionToken = crypto.randomUUID()

    const { data, error } = await supabase
      .from('aid_simulation')
      .insert({
        current_step: 1,
        current_sub_step: 0,
        session_token: sessionToken,
        expiration_date: newExpirationDate,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateSimulation(id: string, updateData: Partial<Simulation>): Promise<Simulation> {
    const { data, error } = await supabase
      .from('aid_simulation')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async extendSimulationExpiration(simulation: Simulation): Promise<Simulation> {
    const newExpirationDate = new Date()
    newExpirationDate.setHours(newExpirationDate.getHours() + 24)

    return this.updateSimulation(simulation.id, {
      expiration_date: newExpirationDate
    })
  }
}
