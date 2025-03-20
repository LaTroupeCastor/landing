<script setup lang="ts">
defineProps<{
  content: string;
  isSelected: boolean;
  allowMultiple?: boolean;
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
      <!-- Image placeholder -->
      <div class="w-10 h-10 md:w-12 md:h-12 bg-black-5 rounded-[4px]"></div>
      <div class="flex items-center justify-center w-full">
        <span class="body-large-medium px-3 md:px-6 pt-3 md:pt-4 text-center text-sm md:text-base">
          {{ content }}
          <span v-if="allowMultiple && isSelected" class="ml-2">✓</span>
        </span>
      </div>
    </div>
  </div>
</template>
