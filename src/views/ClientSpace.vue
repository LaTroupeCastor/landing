<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from "../store/userStore.ts";
import { simulationService } from "../services/simulationService.ts";
import { Simulation, EnergyLabelType, FiscalIncomeType, OccupancyStatusType, WorkType } from "../models/simulation.ts";

const userStore = useUserStore();
const router = useRouter();
const simulation = ref<Simulation | null>(null);
const isLoading = ref(true);

const WorkTypeLabels = {
  [WorkType.ISOLATION]: 'Isolation',
  [WorkType.HEATING]: 'Chauffage',
  [WorkType.VENTILATION]: 'Ventilation',
  [WorkType.WINDOWS]: 'Fenêtres',
  [WorkType.GLOBAL_RENOVATION]: 'Rénovation globale'
};

const formatValue = (value: any, type?: string) => {
  if (value === null || value === undefined) return 'Non renseigné';

  switch(type) {
    case 'boolean':
      return value ? 'Oui' : 'Non';
    case 'energy_label':
      return {
        [EnergyLabelType.A_B_C_D_E]: 'A/B/C/D/E',
        [EnergyLabelType.F_G]: 'F/G',
        [EnergyLabelType.UNKNOWN]: 'Inconnu'
      }[value as EnergyLabelType] || 'Non renseigné';
    case 'fiscal_income':
      return {
        [FiscalIncomeType.VERY_LOW]: 'Très bas',
        [FiscalIncomeType.LOW]: 'Bas',
        [FiscalIncomeType.MEDIUM]: 'Moyen',
        [FiscalIncomeType.HIGH]: 'Élevé',
        [FiscalIncomeType.VERY_HIGH]: 'Très élevé'
      }[value as FiscalIncomeType] || 'Non renseigné';
    case 'occupancy_status':
      return {
        [OccupancyStatusType.OWNER_OCCUPANT]: 'Propriétaire occupant',
        [OccupancyStatusType.TENANT]: 'Locataire',
        [OccupancyStatusType.OWNER_LESSOR]: 'Propriétaire bailleur',
        [OccupancyStatusType.CO_OWNER]: 'Copropriétaire'
      }[value as OccupancyStatusType] || 'Non renseigné';
    case 'work_type':
      if (Array.isArray(value)) {
        return (value as WorkType[]).map(v => WorkTypeLabels[v] || 'Non renseigné').join(', ');
      }
      return WorkTypeLabels[value as WorkType] || 'Non renseigné';
    default:
      return value.toString();
  }
};

const formattedFields = computed(() => {
  if (!simulation.value) return [];

  const fields = [
    { label: 'Prénom', value: simulation.value.first_name },
    { label: 'Nom', value: simulation.value.last_name },
    { label: 'Email', value: simulation.value.email },
    { label: 'Aide ANAH dernière 5 ans', value: simulation.value.anah_aid_last_5_years, type: 'boolean' },
    { label: 'Matériaux biosourcés', value: simulation.value.biosourced_materials, type: 'boolean' },
    { label: 'Bâtiment >15 ans', value: simulation.value.building_age_over_15, type: 'boolean' },
    { label: 'Diagnostic énergétique', value: simulation.value.energy_diagnostic_done, type: 'boolean' },
    { label: 'Étiquette énergie', value: simulation.value.energy_label, type: 'energy_label' },
    { label: 'Revenu fiscal', value: simulation.value.fiscal_income, type: 'fiscal_income' },
    { label: 'Statut occupation', value: simulation.value.occupancy_status, type: 'occupancy_status' },
    { label: 'Type de travaux', value: simulation.value.work_type, type: 'work_type' }
  ];

  return fields.map(field => ({
    ...field,
    displayValue: formatValue(field.value, field.type)
  }));
});

onMounted(async () => {
  if (userStore.isAuthenticated && userStore.user?.id) {
    simulation.value = await simulationService.getSimulationByUserId(userStore.user.id);
  }
  isLoading.value = false;
});

const logout = async () => {
  await userStore.logout();
  router.push('/');
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Votre espace client</h1>

    <div v-if="isLoading" class="text-lg">Chargement en cours...</div>

    <div v-else>
      <div v-if="simulation" class="bg-gray-100 p-6 rounded-lg space-y-4">
        <h2 class="text-xl font-semibold mb-4">Vos informations</h2>

        <div v-for="field in formattedFields" :key="field.label" class="flex justify-between border-b pb-2">
          <span class="text-gray-600 font-medium">{{ field.label }}</span>
          <span class="text-gray-800">{{ field.displayValue }}</span>
        </div>
      </div>

      <div v-else class="text-red-500 mt-4">
        Aucune simulation trouvée associée à votre compte
      </div>

      <!-- Nouveau placement du bouton de déconnexion -->
      <div class="mt-8 text-center">
        <button
          @click="logout"
          class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  </div>
</template>
