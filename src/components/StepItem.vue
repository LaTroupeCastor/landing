<script setup lang="ts">
interface Props {
  number: number;
  text: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex items-center">
    <div class="bg-primary300 w-40 h-36 flex
 items-center justify-center">
      <span class="headline-large-sbold text-7x
 font-semibold text-white">{{ number }}</span>
    </div>
    <p class="bg-primary200 pl-16 pr-12
 title-medium-medium w-full h-full flex
 items-center justify-center py-12">{{ text }}
    </p>
  </div>
</template>
