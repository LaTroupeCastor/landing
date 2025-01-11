<template>
  <div>
    <div class="section-header-subtitle text-primary-100">{{ subtitle }}</div>
    <div class="section-header-title md:w-[80%] mt-2">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
}

defineProps<Props>()
</script>
