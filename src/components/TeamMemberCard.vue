<template>
  <div class="max-w-sm mx-auto w-full team-member-card">
    <div class="bg-primary-5 rounded-lg relative p-4 mb-3">
      <div class="flex justify-center items-center h-96">
        <div class="w-full h-full relative overflow-hidden rounded-lg">
          <img
            :src="profileImage"
            :alt="name"
            class="w-full h-full object-cover object-center"
          />
          <div class="body-large-medium absolute top-2 left-1/2 transform -translate-x-1/2 bg-white px-3 rounded-full shadow-sm">
            {{ nickname }}
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-2 absolute bottom-3 left-3">
        <div v-for="role in roles" :key="role" class="bg-primary-20 text-primary-100 w-min px-3 py-1 rounded-md text-sm">
          {{ role }}
        </div>
      </div>
    </div>
    <div class="min-h-[120px]">
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
