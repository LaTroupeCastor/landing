<template>
  <div class="container mx-auto">
    <div class="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-32">
      <div class="w-full lg:w-[42%]">
        <ContactForm/>
      </div>
      <div class="lg:w-[45%]">
        <ImageForm/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ContactForm from "./ContactForm.vue";
import ImageForm from "./ImageForm.vue";
</script>
