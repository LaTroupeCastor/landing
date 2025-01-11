<script setup lang="ts">
interface Props {
  number: number;
  text: string;
}

defineProps<Props>();
</script>

<template>
  <!-- Version Desktop -->
  <div class="hidden lg:flex items-center">
    <div class="bg-primary-40 w-40 h-36 flex items-center justify-center">
      <span class="headline-large-sbold text-7xl font-semibold text-white">{{ number }}</span>
    </div>
    <p class="bg-primary-20 pl-16 pr-12 title-medium-medium flex items-center justify-center py-12 w-full h-36">
      {{ text }}
    </p>
  </div>

  <!-- Version Mobile/Tablet -->
  <div class="lg:hidden bg-[#FBF3E4] p-8 rounded-lg">
    <div class="text-5xl font-semibold text-primary-100 mb-4">{{ number }}</div>
    <div class="body-small-regular">{{ text }}</div>
  </div>
</template>
