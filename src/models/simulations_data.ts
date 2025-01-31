import { supabase } from '../supabase_client';
import { SimulationQuestion, SimulationSubQuestion, SimulationAnswer } from './simulation_question';
import { CreateSimulationDTO, Simulation } from './simulation';

export async function createNewSimulation(existingToken?: string): Promise<Simulation> {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);

    const sessionToken = existingToken || crypto.randomUUID();

    const simulationData: CreateSimulationDTO = {
        current_step: 1,
        current_sub_step: 0,
        department: '',
        email: '',
        session_token: sessionToken,
        expiration_date: expirationDate
    };

    const { data, error } = await supabase
        .from('aid_simulation')
        .insert([simulationData])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function fetchSimulationData(): Promise<SimulationQuestion[]> {
    // Fetch main questions
    const { data: questions, error: questionsError } = await supabase
        .from('aid_questions')
        .select('*')
        .order('step_number');

    if (questionsError) throw questionsError;

    // Fetch sub-questions with their answers
    const { data: subQuestions, error: subQuestionsError } = await supabase
        .from('aid_sub_questions')
        .select<any, SimulationSubQuestion & { answers: SimulationAnswer[] }>(`
            *,
            answers:aid_answers(*)
        `)
        .order('sub_step_number');

    if (subQuestionsError) throw subQuestionsError;

    // Group sub-questions by question_id
    const subQuestionsByQuestionId = subQuestions.reduce((acc, subQ) => {
        if (!acc[subQ.question_id]) {
            acc[subQ.question_id] = [];
        }
        acc[subQ.question_id].push({
            ...subQ,
            answers: subQ.answers || []
        });
        return acc;
    }, {} as Record<string, SimulationSubQuestion[]>);

    // Combine everything
    return questions.map(q => ({
        ...q,
        subQuestions: subQuestionsByQuestionId[q.id] || []
    }));
}

