<template>
  <div alt="image-form" class="flex flex-col">
    <div>
      <img src="../assets/form_right.png" alt="Form"/>
    </div>
    <div class="flex flex-row mt-5">
      <div class="flex flex-row items-center">
        <RectangleWithIcon :src="Phone"/>
        <div class="flex flex-col ml-5">
          <div class="text-black-100 body-large-sbold">Email</div>
          <div class="body-large-regular text-black-60 mt-1">contact@latroupecastor.fr</div>
        </div>
      </div>

      <div class="flex flex-row ml-6 items-center">
        <RectangleWithIcon :src="Phone"/>
        <div class="flex flex-col ml-5">
          <div class="text-black-100 body-large-sbold">Téléphone</div>
          <div class="body-large-regular text-black-60 mt-1">02 45 62 34 98</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import RectangleWithIcon from "./RectangleWithIcon.vue";
import Phone from "../assets/phone.svg";
</script>
