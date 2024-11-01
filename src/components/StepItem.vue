<script setup lang="ts">
interface Props {
  number: number;
  text: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex items-start gap-8">
    <div class="bg-secondary w-32 h-32 flex items-center justify-center">
      <span class="text-7xl font-semibold">{{ number }}</span>
    </div>
    <p class="text-xl mt-4">{{ text }}</p>
  </div>
</template>
