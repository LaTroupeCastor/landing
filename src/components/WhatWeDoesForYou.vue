<template>
  <div class="border-black-10 border-2 rounded-[3px] pt-8 pl-8 pb-6 pr-2">
    <RectangleWithIcon :src="PeopleSvg" alt="personne" />
    <p class="what-we-do-title my-6 w-[55%] text-black-100">{{title}}</p>
    <p class="what-we-do-body text-black-60">{{body}}</p>
  </div>
</template>
<script setup lang="ts">
import RectangleWithIcon from "./RectangleWithIcon.vue";
import PeopleSvg from "../assets/people.svg";  // Ajoutez cette ligne

interface Props {
  title: string;
  body: string;
}

defineProps<Props>();
</script>
