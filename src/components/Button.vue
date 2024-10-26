<template>
  <button :class="['text-center title-small-sbold p-4 rounded', !cta ? 'border' : '', cta ? 'bg-primary text-white' : 'bg-white']" type="button">
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
