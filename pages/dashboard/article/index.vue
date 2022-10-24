<template>
  <div>article index</div>
</template>

<script setup>
definePageMeta({
  middleware: [
    (to, form) => {
      return navigateTo('/dashboard/article/create');
    }
  ]
});
</script>

<style lang="scss" scoped></style>
