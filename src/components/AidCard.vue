<template>
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div class="flex flex-col h-full">
      <h3 class="title-small-medium text-black-100 mb-2">{{ title }}</h3>
      <p class="body-small-regular text-primary-100 mb-4">{{ amount }}</p>

      <p class="body-small-regular text-black-60 mb-4">{{ description }}</p>

      <div class="mt-auto">
        <h4 class="body-small-sbold text-black-100 mb-2">Conditions :</h4>
        <ul class="space-y-2">
          <li
            v-for="(condition, index) in conditions"
            :key="index"
            class="body-small-regular text-black-60 flex items-start"
          >
            <span class="text-primary-100 mr-2">→</span>
            {{ condition }}
          </li>
        </ul>

        <a
          :href="link" target="_blank"
          class="mt-4 inline-block body-small-sbold text-primary-100 hover:underline"
        >
          En savoir plus sur : {{ linkText }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  conditions: {
    type: Array as () => string[],
    required: true
  },
  link: {
    type: String,
    default: "#"
  },
  linkText: {
    type: String,
    required: true
  }
})
</script>
