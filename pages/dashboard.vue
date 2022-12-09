<template>
  <nuxt-layout name="dashboard">
    <nuxt-page />
  </nuxt-layout>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: [
    (to, form) => {
      if (to.path === '/dashboard') {
        return navigateTo('/dashboard/posts-public');
      }
    }
  ]
});
</script>
