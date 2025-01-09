<template>
  <section class="hero-section">
    <!-- Version Desktop -->
    <div class="hidden lg:flex items-center overflow-hidden pt-16" role="main">
      <img src="../../assets/circle_top_left.svg" class="absolute left-0 top-0 h-4/6" alt="Cercle décoratif" />
      <div class="flex-1 z-10 pl-32">
        <div class="headline-large-sbold pb-9">Rénover votre <span class="text-primary-100">passoire thermique</span> n'a jamais été aussi simple.</div>
        <div class="title-medium-medium pb-8">Obtenez des aides pour vos travaux et un accompagnement humain de A à Z</div>
        <Button :cta="true">Faire une simulation en moins de 10 minutes</Button>
        <div class="flex">
          <Checkbox :text="'Gratuit'" class="pr-9"/>
          <Checkbox :text="'Sans engagement'"/>
        </div>
      </div>
      <div class="flex-1">
        <img class="w-full" src="../../assets/illuhero.svg" alt="Illustration rénovation énergétique" loading="lazy" />
      </div>
    </div>

    <!-- Version Tablette -->
    <div class="hidden sm:flex lg:hidden justify-between pl-8 pt-8">
      <img src="../../assets/circle_top_left.svg" class="absolute left-0 top-0 h-4/6" alt="Cercle décoratif" />
      <div class="flex-1">
        <div class="headline-small-sbold text-[28px]">
          Rénover votre <span class="text-primary-100">passoire thermique</span> n'a jamais été aussi simple.
        </div>
        <div class="title-small-medium text-sm mt-4">
          Obtenez des aides pour vos travaux et un accompagnement humain de A à Z
        </div>
        <div class="mt-6">
          <Button :cta="true">Faire une simulation</Button>
          <div class="flex mt-4">
            <Checkbox :text="'Gratuit'" class="pr-4"/>
            <Checkbox :text="'Sans engagement'"/>
          </div>
        </div>
      </div>
      <div class="flex-shrink-0 w-[400px] flex items-center justify-center">
        <img class="w-full" src="../../assets/illuhero.svg" alt="Illustration rénovation énergétique" loading="lazy" />
      </div>
    </div>

    <!-- Version Mobile -->
    <div class="sm:hidden flex flex-col">
      <img src="../../assets/circle_top_left.svg" class="absolute left-0 top-0 h-4/6" alt="Cercle décoratif" />
      <div class="px-8 pt-8">
        <div class="title-large-sbold text-2xl leading-tight">
          Rénover votre <span class="text-primary-100">passoire thermique</span> n'a jamais été aussi simple.
        </div>
        <div class="mt-8">
          <img
              class="w-full max-w-[380px] mx-auto"
              src="../../assets/illuhero-full.svg"
              alt="Illustration rénovation énergétique"
              loading="lazy"
          />
        </div>
        <div class="body-medium-medium text-sm mt-4">
          Obtenez des aides pour vos travaux et un accompagnement humain de A à Z
        </div>

        <div class="flex flex-col gap-6">
          <Button :cta="true" class="w-8/12 mt-6">Faire une simulation</Button>
          <div class="flex gap-4">
            <Checkbox :need-padding="false" :text="'Gratuit'" />
            <Checkbox :need-padding="false" :text="'Sans engagement'" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from "../Button.vue";
import Checkbox from "../Checkbox.vue";
</script>

<style scoped>
.hero-section {
  min-height: calc(100vh - 80px);
}

@media (max-width: 1024px) {
  .hero-section {
    min-height: auto;
  }
}
</style>
