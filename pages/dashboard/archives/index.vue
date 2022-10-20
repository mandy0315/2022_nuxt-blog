<template>
  <div>archives index</div>
</template>

<script setup>
definePageMeta({
  middleware: [
    (to, form) => {
      return navigateTo('/dashboard/archives/public');
    }
  ]
});
</script>

<style lang="scss" scoped></style>
