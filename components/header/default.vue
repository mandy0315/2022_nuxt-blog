<template>
  <header class="inline-block w-full bg-c-brown-800 text-white shadow">
    <div class="c-container flex items-center py-2">
      <nuxt-link to="/" class="flex items-center">
        <div class="mr-2 inline-block w-7 align-middle">
          <img src="/static/images/logo.svg" alt="logo" />
        </div>
        <span>Mandy 生活技術紀錄</span>
      </nuxt-link>

      <nav class="ml-auto">
        <nuxt-link
          v-for="item in topBarNav"
          :to="item.link"
          :key="item.link"
          class="px-2 text-base hover:text-c-yellow-200"
        >
          {{ item.name }}
        </nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
const topBarNav = [
  {
    link: '/posts',
    name: '文章'
  },
  {
    link: '/categories',
    name: '分類'
  },
  {
    link: '/about',
    name: '關於我'
  }
];
</script>

<style lang="scss" scoped></style>
