<template>
  <main class="c-container pt-6 pb-10">
    請先登入會員，開始編輯文章

    <nuxt-link>登入會員</nuxt-link>
    <nuxt-link>文章管理</nuxt-link>
    <nuxt-link>回到前台</nuxt-link>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
});
</script>

<style lang="scss" scoped></style>
