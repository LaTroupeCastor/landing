<template>
  <button :class="['text-center', cta ? 'button-text' : 'button-text-light', 'p-2.5 rounded', !cta ? 'border' : '', cta ? 'bg-primary' : 'bg-white']" type="button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps({
  cta: {
    type: Boolean,
    default: false
  }
});
</script>
