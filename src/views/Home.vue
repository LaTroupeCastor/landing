<script setup lang="ts">
import FirstSection from "../components/sections/FirstSection.vue";
import SecondSection from "../components/sections/SecondSection.vue";
import ThirdSection from "../components/sections/ThirdSection.vue";
import FourthSection from "../components/sections/FourthSection.vue";
import FifthSection from "../components/sections/FifthSection.vue";
import FormSection from "../components/sections/FormSection.vue";
</script>

<template>
  <div class="flex flex-col gap-20 md:gap-28 lg:gap-52">
    <FirstSection />
    <SecondSection />
    <ThirdSection />
    <FourthSection />
    <FifthSection />
    <FormSection />
  </div>
</template>
