import { supabase } from '../supabase_client';
import { SimulationQuestion, SimulationSubQuestion, SimulationAnswer } from './simulation_question';

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

