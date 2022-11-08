<template>
  <div class="mt-4 -ml-1">
    <nuxt-link
      class="m-1 rounded bg-c-gray-600 py-0.5 px-3 text-white hover:bg-c-gray-800"
      v-for="category in categories"
      :key="category"
      :to="`/categories/${category.toLowerCase()}`"
    >
      <span class="inline-block pb-1 align-middle text-xs">{{ category }}</span>
    </nuxt-link>
  </div>
</template>

<script setup>
const props = defineProps({
  categories: {
    type: Array,
    default: []
  }
});
</script>

<style lang="scss" scoped></style>
