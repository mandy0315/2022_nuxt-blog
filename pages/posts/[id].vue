<template>
  <div>
    <post-content />
  </div>
</template>

<script setup>
useHead({ title: route.params.id });
const route = useRoute();
</script>

<style lang="scss" scoped></style>
