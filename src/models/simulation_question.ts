export interface SimulationQuestion {
    id: string;
    title: string;
    description: string;
    step_number: number;
    created_at: Date;
    updated_at: Date;
    subQuestions: SimulationSubQuestion[];
}

export interface SimulationSubQuestion {
    id: string;
    question_id: string;
    content: string;
    sub_step_number: number;
    created_at: Date;
    updated_at: Date;
    answers: SimulationAnswer[];
}

export interface SimulationAnswer {
    id: string;
    sub_question_id: string;
    content: string;
    image_url: string;
    created_at: Date;
    updated_at: Date;
}
