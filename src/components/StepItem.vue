<script setup lang="ts">
interface Props {
  number: number;
  text: string;
}

defineProps<Props>();
</script>

<template>
  <div class="bg-[#FBF3E4] p-8 rounded-lg">
    <div class="text-5xl font-semibold text-primary-100 mb-4">{{ number }}</div>
    <div class="body-small-regular">{{ text }}</div>
  </div>
</template>
