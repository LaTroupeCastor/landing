<template>
  <div class="bg-primary-10 p-3 rounded-md lg:p-5 w-fit"><img :src="src" class="sm:w-5 sm:h-5" :alt="alt" /></div>
</template>

<script setup lang="ts">
interface Props {
  src: string;
  alt: string;
}

defineProps<Props>();
</script>
