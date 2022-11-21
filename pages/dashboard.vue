<template>
  <div>
    <nuxt-page />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: [
    (to, form) => {
      if (to.path === '/dashboard') {
        return navigateTo('/dashboard/posts-public');
      }
    }
  ]
});
</script>

<style lang="scss" scoped></style>
