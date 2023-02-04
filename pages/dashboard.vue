<template>
  <nuxt-layout :name="false">
    <nuxt-page />
  </nuxt-layout>
</template>

<script setup>
import { useMainStore } from '@/stores/index';

definePageMeta({
  layout: 'dashboard',
  middleware: [
    'auth',
    (to, form) => {
      const $mainStore = useMainStore();

      if ($mainStore.isLogin && to.path === '/dashboard') {
        return navigateTo('/dashboard/posts-public');
      }
    }
  ]
});
</script>
