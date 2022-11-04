<template>
  <div>
    <ui-breadcrumb />
    <ui-post-content />
  </div>
</template>

<script setup>
const route = useRoute();
useHead({
  title: route.params.id
});
</script>

<style lang="scss" scoped></style>
