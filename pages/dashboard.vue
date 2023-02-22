<script setup>
import { useMainStore } from '@/stores/index';

definePageMeta({
  layout: 'dashboard',
  middleware: [
    'auth',
    (to, form) => {
      const $mainStore = useMainStore();

      if ($mainStore.isLogin && to.path === '/dashboard') {
        return navigateTo('/dashboard/post/manage-public');
      }
    }
  ]
});
</script>
<template>
  <NuxtPage />
</template>
