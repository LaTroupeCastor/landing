<template>
  <div class="section-style">
    <div class="grid grid-cols-[46%_44%] gap-32">
      <ContactForm/>
      <ImageForm/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageForm from "../ImageForm.vue";
import ContactForm from "../ContactForm.vue";
</script>
