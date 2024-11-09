<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="w-5 h-5 rounded cursor-pointer accent-[#F1AB0E]"
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
  background-color: #F4F4F4;
  border: 2px solid #F1AB0E;
  border-radius: 4px;
}

input[type="checkbox"]:checked {
  background-color: #F1AB0E;
  position: relative;
}

input[type="checkbox"]:checked::before {
  content: "✓";
  font-size: 14px;
  color: white;
  position: absolute;
  right: 1px;
  top: -1px;
}
</style>
