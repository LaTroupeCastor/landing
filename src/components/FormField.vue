<!-- src/components/FormField.vue -->
<template>
  <div class="flex flex-col">
    <label
        :for="id"
        class="mb-2 title-small-medium"
    >
      {{ label }}
    </label>
    <input
        :type="type"
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        class="p-3 bg-black-10 rounded-lg h-12 body-small-regular placeholder-black-60"
        :class="{ 'border-2 border-red-500': error }"
    >
    <span
        v-if="error"
        class="text-red-500 text-sm mt-1"
    >
       {{ error }}
     </span>
  </div>
</template>

<script setup lang="ts">
interface FormFieldProps {
  id: string;
  label: string;
  modelValue: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'password';
  error?: string;
}

withDefaults(defineProps<FormFieldProps>(), {
  type: 'text',
  placeholder: '',
  error: ''
});

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>
