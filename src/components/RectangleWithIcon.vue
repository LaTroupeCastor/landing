<template>
  <img :src="src" class="bg-primary-10 rounded-md p-5" :alt="alt" />
</template>

<script setup lang="ts">
interface Props {
  src: string;
  alt: string;
}

defineProps<Props>();
</script>
