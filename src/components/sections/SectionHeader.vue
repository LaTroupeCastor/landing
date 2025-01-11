<template>
  <div>
    <div class="section-header-subtitle text-primary-100">{{ subtitle }}</div>
    <div class="section-header-title w-[80%]">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
}

defineProps<Props>()
</script>
