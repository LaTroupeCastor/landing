<template>
  <button :class="['text-center poppins-semibold p-3 rounded', !cta ? 'border' : '', cta ? 'bg-primary' : 'bg-white']" type="button">
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
