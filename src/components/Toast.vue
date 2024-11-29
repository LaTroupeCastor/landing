<template>
  <div
      class="mb-2 p-4 rounded-lg shadow-lg transition-all duration-300"
      :class="{
        'bg-green-500 text-white': type === 'success',
        'bg-red-500 text-white': type === 'error'
      }"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { ToastType } from '../store/toastStore';

defineProps<{
  message: string;
  type: ToastType;
}>();
</script>
