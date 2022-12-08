<template>
  <main class="c-container pt-6 pb-10">
    <div>Hello</div>
  </main>
</template>

<script setup>
useHead({ title: route.params.id });
const route = useRoute();
</script>

<style lang="scss" scoped></style>
