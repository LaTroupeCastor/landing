import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Simulation } from '../models/simulation';
import { supabase } from '../supabase_client';

const SIMULATION_TOKEN_KEY = 'simulation_token';

export const useSimulationStore = defineStore('simulation', () => {
    const currentSimulation = ref<Simulation | null>(null);

    function getStoredToken(): string | null {
        return localStorage.getItem(SIMULATION_TOKEN_KEY);
    }

    function setStoredToken(token: string) {
        localStorage.setItem(SIMULATION_TOKEN_KEY, token);
    }

    function clearStoredToken() {
        localStorage.removeItem(SIMULATION_TOKEN_KEY);
    }

    async function checkExistingSimulation(): Promise<Simulation | null> {
        const token = getStoredToken();
        if (!token) return null;

        const { data, error } = await supabase
            .from('aid_simulation')
            .select('*')
            .eq('session_token', token)
            .single();

        if (error || !data) {
            clearStoredToken();
            return null;
        }

        const simulation = data as Simulation;
        const expirationDate = new Date(simulation.expiration_date);
        
        if (expirationDate < new Date()) {
            clearStoredToken();
            return null;
        }

        return simulation;
    }

    async function extendSimulationExpiration(simulation: Simulation): Promise<Simulation> {
        const newExpirationDate = new Date();
        newExpirationDate.setHours(newExpirationDate.getHours() + 24);

        const { data, error } = await supabase
            .from('aid_simulation')
            .update({ expiration_date: newExpirationDate })
            .eq('id', simulation.id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    return {
        currentSimulation,
        getStoredToken,
        setStoredToken,
        clearStoredToken,
        checkExistingSimulation,
        extendSimulationExpiration
    };
});
