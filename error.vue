<template>
  <nuxt-layout :name="isDashboardPath ? 'dashboard' : 'default'">
    <div v-if="error.statusCode === '404'" class="c-container flex flex-col items-center">
      <h1 class="pt-20 pb-8 text-center text-3xl text-c-brown-800">404 找不到此頁面</h1>
      <nuxt-link :to="isDashboardPath ? '/dashboard' : '/'" class="c-text-button">返回頁面</nuxt-link>
    </div>
  </nuxt-layout>
</template>

<script setup>
useHead({ title: '404 找不到此頁面' });
const $route = useRoute();
const props = defineProps({
  error: Object
});

const isDashboardPath = computed(() => /^\/dashboard/g.test($route.path));
</script>

<style lang="scss" scoped></style>
