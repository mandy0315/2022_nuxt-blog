<template>
  <div>Hello</div>
</template>

<script setup>
const route = useRoute();
const categoriesType = route.params.categoriesType;

useHead({
  title: categoriesType[0].toUpperCase() + categoriesType.slice(1)
});
</script>

<style lang="scss" scoped></style>
