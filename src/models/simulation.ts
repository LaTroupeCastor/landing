export enum EnergyLabelType {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    E = 'E',
    F = 'F',
    G = 'G'
}

export enum OccupancyStatusType {
    OWNER = 'owner',
    TENANT = 'tenant'
}

export interface Simulation {
    id: string;
    current_step: number;
    session_token: string;
    expiration_date: Date;
    created_at?: Date;
    updated_at?: Date;
    department: string;
    email: string;
    
    // Optional fields
    anah_aid_last_5_years?: boolean;
    biosourced_materials?: boolean;
    building_age_over_15?: boolean;
    energy_diagnostic_done?: boolean;
    energy_label?: EnergyLabelType;
    fiscal_income?: number;
    living_area?: number;
    occupancy_status?: OccupancyStatusType;
    token_expiration?: Date;
}

export interface CreateSimulationDTO {
    current_step: number;
    department: string;
    email: string;
    session_token: string;
    expiration_date: Date;
}
