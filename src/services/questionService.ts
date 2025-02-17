import { supabase } from '../supabase_client'
import { SimulationQuestion } from '../models/simulation_question'

export const questionService = {
    async getQuestions(): Promise<SimulationQuestion[]> {
        const { data, error } = await supabase
            .from('aid_questions')
            .select(`                                                                                                                                                                        
         *,                                                                                                                                                                             
         subQuestions:aid_sub_questions(                                                                                                                                      
           *,                                                                                                                                                                           
           answers:aid_answers(*)                                                                                                                                             
         )                                                                                                                                                                              
       `)
            .order('step_number', { ascending: true })

        if (error) throw error
        return data || []
    }
}
