<script setup lang="ts">
defineProps<{
  content: string;
  isSelected: boolean;
  allowMultiple?: boolean;
  imageUrl: string; // Ajout de la prop
}>();
</script>

<template>
  <div
      class="border rounded-xl cursor-pointer transition-all duration-200 w-full h-full sm:max-w-none md:min-w-[150px]"
      :class="{
      'bg-primary-5 border-primary-100': isSelected,
      'hover:bg-black-5 border-black-30': !isSelected
    }"
  >
    <div class="flex flex-col items-center py-4 md:py-6">
      <!-- Remplacement de la div par l'image -->
      <img
        :src="`/questions_icons/${imageUrl}.svg`"
        class="w-6 h-6 md:w-8 md:h-8 object-contain mb-2"
        :alt="content"
      />
      <div class="flex items-center justify-center w-full">
        <span class="body-large-medium px-3 md:px-6 pt-3 md:pt-4 text-center text-sm md:text-base">
          {{ content }}
          <span v-if="allowMultiple && isSelected" class="ml-2">✓</span>
        </span>
      </div>
    </div>
  </div>
</template>
