<template>
  <div class="relative h-0 w-full overflow-hidden rounded bg-white pb-[56.25%]">
    <img :src="link" :alt="title" class="absolute h-full w-full object-cover object-center" />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  }
});
</script>

<style lang="scss" scoped></style>
