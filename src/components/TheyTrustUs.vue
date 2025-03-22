<template>
  <div class="relative bg-white pb-5">
    <img src="../assets/guillemet.svg" alt="Guillemet"
         class="absolute top-4 left-7 -z-0"/>
    <p class="p-5 lg:p-10 relative they-trust-us-body">
      {{ comment }}
    </p>
    <div alt="divider" class="bg-divider h-[1.5px] mx-8 mb-4"/>
    <div class="flex flex-row">
      <div class="flex flex-col mx-8">
        <p class="they-trust-us-person-name">{{ authorName }}</p>
        <p class="body-small-regular">{{ authorRole }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  comment: string
  authorName: string
  authorRole: string
}>()
</script>
