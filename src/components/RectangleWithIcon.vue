<template>
  <img :src="src" class="bg-primary-10 rounded-md p-5" :alt="alt" />
</template>

<script>
export default {
  props: {
    src: String,
    alt: String
  }
}
</script>
