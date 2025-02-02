<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  number: number;
  title: string;
  currentStep: number;
  isLast?: boolean;
}

const props = defineProps<Props>();

const isCompleted = computed(() => props.number < props.currentStep);
const isCurrent = computed(() => props.number === props.currentStep);
</script>

<template>
  <div class="flex items-start gap-7">
    <div class="flex flex-col items-center">
      <div
        class="rounded-full w-8 h-8 flex items-center justify-center"
        :class="[
          isCompleted || isCurrent
            ? 'border-primary-100 border-[1px] bg-primary-20 text-primary-100'
            : 'border-primary-100 border-[1px] text-primary-100'
        ]"
      >
        <span class="body-medium-sbold">{{ number }}</span>
      </div>
      <div
        v-if="!isLast"
        class="w-[1px] h-16"
        :class="[
          isCompleted && !isCurrent
            ? 'bg-primary-100'
            : 'bg-primary-20'
        ]"
      />
    </div>
    <span
      :class="[
        isCompleted || isCurrent
          ? 'title-small-medium text-black-100'
          : 'body-large-regular text-black-40'
      ]"
    >
      {{ title }}
    </span>
  </div>
</template>
