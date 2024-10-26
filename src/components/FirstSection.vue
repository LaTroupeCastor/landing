<template>
  <section>
    <div class="grid justify-between">
      <img src="../assets/circle_top_left.svg" class="col-start-1 row-start-1" alt="Tete Logo" />
      <div class="flex col-start-1 row-start-1">
        <div class="pl-36 pt-36">
          <div class="headline-large-sbold pb-9">Rénover votre <span class="text-primary">passoire thermique</span> n’a jamais été aussi simple.</div>
          <div class="title-medium-medium pb-8">Obtenez des aides pour vos travaux et un accompagnement humain de A à Z</div>
          <Button :cta="true">Faire une simulation en moins de 10 minutes</Button>
        </div>
        <img  class="w-1/2" src="../assets/illuhero.svg" alt="Tete Logo" />
        
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import Button from "./Button.vue";
</script>
