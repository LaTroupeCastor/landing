<template>
  <div>
    <div class="title-small-regular text-primary-100">{{ subtitle }}</div>
    <div class="headline-medium-sbold w-[80%]">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
}

defineProps<Props>()
</script>
