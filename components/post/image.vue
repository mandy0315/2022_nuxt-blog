<template>
  <div class="overflow-hidden rounded">
    <img :src="link" :alt="title" class="h-full w-full object-cover" />
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
