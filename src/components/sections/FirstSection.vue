<template>
  <section class="hero-section h-screen">
    <div class="grid grid-cols-2 h-full items-center px-36" role="main">
      <img src="../../assets/circle_top_left.svg" class="absolute left-0 top-0 h-4/6" alt="Cercle décoratif" />
      <div class="z-10">
          <div class="headline-large-sbold pb-9">Rénover votre <span class="text-primary">passoire thermique</span> n’a jamais été aussi simple.</div>
          <div class="title-medium-medium pb-8">Obtenez des aides pour vos travaux et un accompagnement humain de A à Z</div>
          <Button :cta="true">Faire une simulation en moins de 10 minutes</Button>
          <div class="flex">
            <Checkbox :text="'Gratuit'" class="pr-9"/>
            <Checkbox :text="'Sans engagement'"/>
          </div>
        </div>
        <img class="w-full" src="../../assets/illuhero.svg" alt="Illustration rénovation énergétique" loading="lazy" />
    </div>
  </section>
</template>
<script setup lang="ts">
import Button from "../Button.vue";
import Checkbox from "../Checkbox.vue";
</script>
