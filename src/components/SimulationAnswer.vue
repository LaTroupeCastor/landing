<script setup lang="ts">
defineProps<{
  content: string;
  isSelected: boolean;
  allowMultiple?: boolean;
}>();
</script>

<template>
  <div
      class="border rounded-xl cursor-pointer transition-all duration-200 h-full min-w-[150px]"
      :class="{
      'bg-primary-5 border-primary-100': isSelected,
      'hover:bg-black-5 border-black-30': !isSelected
    }"
  >
    <div class="flex flex-col items-center pt-10 pb-10">
      <!-- Image placeholder -->
      <div class="w-10 h-10 bg-black-5 rounded-[4px]"></div>
      <div class="flex items-center justify-center w-full">
        <span class="body-large-medium px-10 pt-6 text-center">
          {{ content }}
          <span v-if="allowMultiple && isSelected" class="ml-2">✓</span>
        </span>
      </div>
    </div>
  </div>
</template>
