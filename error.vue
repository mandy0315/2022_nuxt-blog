<template>
  <nuxt-layout :name="isDashboardPages ? 'dashboard' : 'default'">
    <div v-if="error.statusCode === '404'" class="c-container flex flex-col items-center">
      <h1 class="pt-20 pb-8 text-center text-4xl font-bold">404 找不到此頁面</h1>
      <nuxt-link :to="isDashboardPages ? '/dashboard' : '/'" class="c-btn c-btn-brown">{{
        isDashboardPages ? '回筆記管理頁' : '回首頁'
      }}</nuxt-link>
    </div>
  </nuxt-layout>
</template>

<script setup>
import { useMainStore } from '@/stores/index';

useHead({ title: '404 找不到此頁面' });
const $route = useRoute();
const props = defineProps({
  error: Object
});

const $mainStore = useMainStore();
const isDashboardPages = computed(() => $mainStore.isDashboardPages);
</script>
