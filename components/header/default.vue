<template>
  <header class="inline-block w-full bg-white shadow dark:bg-c-gray-600 dark:text-white">
    <div class="c-container flex items-center py-2">
      <nuxt-link to="/" class="inline-block">
        <div class="mr-2 inline-block w-10 align-middle">
          <img src="/static/images/logo.svg" alt="logo" />
        </div>
        <span class="relative top-1 text-xl font-medium dark:text-white">Mandy Blog</span>
      </nuxt-link>

      <nav class="pl-5">
        <nuxt-link v-for="item in topBarNav" :to="item.link" :key="item.link" class="px-2 hover:text-c-orange-800">
          {{ item.name }}
        </nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
const topBarNav = [
  {
    link: '/about',
    name: '關於我'
  },
  {
    link: '/posts',
    name: '文章'
  },
  {
    link: '/categories',
    name: '分類'
  }
];
</script>

<style lang="scss" scoped></style>
