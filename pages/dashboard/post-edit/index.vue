<template>
  <main class="c-container pt-6 pb-10">
    <h1 class="c-dashboard-title">新增文章</h1>
    <dashboard-post-edit-forms />
  </main>
</template>

<script setup>
useHead({
  title: '新增文章'
});
definePageMeta({
  layout: 'dashboard'
});
</script>
