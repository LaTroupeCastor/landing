export enum EnergyLabelType {
    A_B_C_D_E = 'A_B_C_D_E',
    F_G = 'F_G',
    UNKNOWN = 'UNKNOWN'
}

export function energyLabelTypeFromString(value: string): EnergyLabelType | undefined {
    switch (value) {
        case 'A_B_C_D_E':
            return EnergyLabelType.A_B_C_D_E;
        case 'F_G':
            return EnergyLabelType.F_G
        case 'UNKNOWN':
            return EnergyLabelType.UNKNOWN;
        default:
            return undefined;
    }
}

//get bool from string (true or false)
export function getBoolFromString(value: string): boolean {
    return value === 'true' || value === 'TRUE' || value === 'yes';
}

export function workTypeFromString(value: string): WorkType | undefined {
    switch (value) {
        case 'isolation':
            return WorkType.ISOLATION;
        case 'heating':
            return WorkType.HEATING;
        case 'ventilation':
            return WorkType.VENTILATION;
        case 'windows':
            return WorkType.WINDOWS;
        case 'global':
            return WorkType.GLOBAL_RENOVATION;
        default:
            return undefined;
    }
}

export function fiscalIncomeFromString(value: string): FiscalIncomeType | undefined {
    switch (value) {
        case 'very_low':
            return FiscalIncomeType.VERY_LOW;
        case 'low':
            return FiscalIncomeType.LOW;
        case 'medium':
            return FiscalIncomeType.MEDIUM;
        case 'high':
            return FiscalIncomeType.HIGH;
        case 'very_high':
            return FiscalIncomeType.VERY_HIGH;
        default:
            return undefined;
    }
}

export enum FiscalIncomeType {
    VERY_LOW = "very_low", //De 0 à 15 262
    LOW = "low", //De 15 263 à 19 565
    MEDIUM = "medium", //De 19 566 à 29 148
    HIGH = "high", //De 29 149 à 38 184
    VERY_HIGH = "very_high", //Plus de 38 184
}

export enum OccupancyStatusType {
    OWNER_OCCUPANT = 'owner_occupant',
    OWNER_LESSOR = 'owner_lessor',
    TENANT = 'tenant',
    CO_OWNER = 'co_owner',
}

export function occupancyStatusTypeFromString(value: string): OccupancyStatusType | undefined {
    switch (value) {
        case 'owner_occupant':
            return OccupancyStatusType.OWNER_OCCUPANT;
        case 'tenant':
            return OccupancyStatusType.TENANT;
        case 'owner_lessor':
            return OccupancyStatusType.OWNER_LESSOR;
        case 'co_owner':
            return OccupancyStatusType.CO_OWNER;
        default:
            return undefined;
    }
}

export enum WorkType {
    ISOLATION = 'isolation',
    HEATING = 'heating',
    VENTILATION = 'ventilation',
    WINDOWS = 'windows',
    GLOBAL_RENOVATION = 'global'
}

export interface Simulation {
    id: string;
    current_step: number;
    current_sub_step: number;
    session_token: string;
    expiration_date: Date;
    created_at?: Date;
    updated_at?: Date;
    name: string;
    subname: string;
    email: string;

    // Optional fields
    anah_aid_last_5_years?: boolean;
    biosourced_materials?: boolean;
    building_age_over_15?: boolean;
    energy_diagnostic_done?: boolean;
    energy_label?: EnergyLabelType;
    fiscal_income?: FiscalIncomeType;
    occupancy_status?: OccupancyStatusType;
    token_expiration?: Date;
    work_type?: WorkType;
}

export interface CreateSimulationDTO {
    current_step: number;
    current_sub_step: number;
    department: string;
    email: string;
    session_token: string;
    expiration_date: Date;
}

