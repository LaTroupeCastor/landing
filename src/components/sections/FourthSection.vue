<template>
  <div class="section-style">
    <div class="flex flex-col gap-16">
      <div>
        <SectionHeader
            :title="'Ce que Beavy fait pour vous'"
            :subtitle="'Les avantages de Beavy'"
        />
      </div>

      <div class="grid grid-cols-[40%_60%] items-center">
        <img src="../../assets/section4_left.svg"
             alt="Illustration gauche"/>
        <div class="grid grid-cols-2 gap-8">
          <WhatBeavyDoesForYou />
          <WhatBeavyDoesForYou />
          <WhatBeavyDoesForYou />
          <WhatBeavyDoesForYou />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SectionHeader from "./SectionHeader.vue";
import WhatBeavyDoesForYou from "../WhatBeavyDoesForYou.vue";
</script>
