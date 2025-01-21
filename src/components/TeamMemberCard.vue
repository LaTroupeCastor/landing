<template>
  <div class="max-w-sm mx-auto w-full">
    <div class="bg-primary-5 rounded-lg relative p-4 mb-3">
      <div class="flex justify-center items-center">
        <img :src="profileImage" :alt="name" class="mt-8 w-2/3 sm:w-3/4 rounded-lg" />
      </div>
      <div class="body-large-medium absolute top-8 transform -translate-x-1/2 -translate-y-1/2 left-1/2">{{ nickname }}</div>
      <div class="flex flex-row gap-2 absolute bottom-3 left-3">
        <div v-for="role in roles" :key="role" class="bg-primary-20 text-primary-100 w-min px-3 py-1 rounded-md text-sm">
          {{ role }}
        </div>
      </div>
    </div>
    <div class="">
      <h3 class="body-large-medium mb-2">{{ name }}</h3>
      <p class="text-black-60 body-medium-regular">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  nickname: string
  profileImage: string
  roles: string[]
  description: string
}>()
</script>
