<template>
  <div class="flex items-center">
    <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        class="relative w-3.5 h-3.5 rounded-sm cursor-pointer accent-primary-100"
        :class="{ 'border-2 border-red-500': hasError }"
    />
    <span class="text-black body-large-medium pl-2">
       <slot></slot>
     </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  hasError: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  background-color: #FFFFFF;
  border: 1.5px solid #F1AB0E;
  border-radius: 4px;
}

input[type="checkbox"]:checked {
  background-color: #F1AB0E;
  position: relative;
}

input[type="checkbox"]:checked::after {
  content: "✓";
  font-size: 14px;
  color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  line-height: 1;
}

input[type="checkbox"].border-red-500 {
  border-color: rgb(239 68 68) !important;
}
</style>
