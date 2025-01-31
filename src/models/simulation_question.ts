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
    type_sub_questions: TypeSubQuestion;
    answers: SimulationAnswerModel[];
}

export interface SimulationAnswerModel {
    id: string;
    sub_question_id: string;
    content: string;
    image_url: string;
    created_at: Date;
    updated_at: Date;
    value: string;
}

export enum TypeSubQuestion {
    ANAH = 'anah',
    BIOSOURCED = 'biosourced',
    BUILDING_AGE = 'building_age',
    ENERGY_DIAGNOSTIC = 'energy_diagnostic',
    ENERGY_LABEL = 'energy_label',
    FISCAL_INCOME = 'fiscal_income',
    OCCUPANCY_STATUS = 'occupancy_status',
    WORK_TYPE = 'work_type'
}

export function typeSubQuestionFromString(value: string): TypeSubQuestion | undefined {
    switch (value) {
        case 'anah':
            return TypeSubQuestion.ANAH;
        case 'biosourced':
            return TypeSubQuestion.BIOSOURCED;
        case 'building_age':
            return TypeSubQuestion.BUILDING_AGE;
        case 'energy_diagnostic':
            return TypeSubQuestion.ENERGY_DIAGNOSTIC;
        case 'energy_label':
            return TypeSubQuestion.ENERGY_LABEL;
        case 'fiscal_income':
            return TypeSubQuestion.FISCAL_INCOME;
        case 'occupancy_status':
            return TypeSubQuestion.OCCUPANCY_STATUS;
        case 'work_type':
            return TypeSubQuestion.WORK_TYPE;
        default:
            return undefined;
    }
}
