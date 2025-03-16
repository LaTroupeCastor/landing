<template>
  <button
      :class="[
       'text-center body-medium-sbold sm:title-small-sbold p-2 md:p-3 sm:p-4 rounded flex items-center justify-center gap-2 relative text-sm md:text-base',
       !cta ? 'border border-black' : 'bg-primary-100 text-white',
       disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
     ]"
      :type="type"
      :aria-label="$slots.default ? undefined : 'Action button'"
      :disabled="disabled || loading"
      role="button">
    <!-- Loading Spinner -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <div class="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white"></div>
    </div>

    <img
        v-if="leadingIcon && !loading"
        :src="leadingIcon"
        :alt="leadingIconAlt || 'Icon'"
        :class="[`w-4 h-4 md:w-${iconSize} md:h-${iconSize}`]"
    />

    <!-- Content with opacity when loading -->
    <div :class="{ 'opacity-0': loading }" class="hidden sm:block">
      <slot></slot>
    </div>

    <!-- Trailing Icon -->
    <img
        v-if="trailingIcon && !loading"
        :src="trailingIcon"
        :alt="trailingIconAlt || 'Icon'"
        :class="[`w-${iconSize} h-${iconSize}`]"
    />
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  cta?: boolean;
  trailingIcon?: string;
  trailingIconAlt?: string;
  leadingIcon?: string;
  leadingIconAlt?: string;
  iconSize?: number;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

withDefaults(defineProps<ButtonProps>(), {
  iconSize: 5,
  loading: false,
  disabled: false,
  cta: false
});
</script>

<style scoped>
/* Optionnel : Animation personnalisée pour le spinner */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
