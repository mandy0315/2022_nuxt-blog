<template>
  <header class="bg-c-gray-800">
    <div class="c-container flex items-center py-2 text-white">
      <nuxt-link to="/dashboard" class="inline-block">
        <div class="mr-2 inline-block w-10 align-middle">
          <img src="/images/icon/logo.svg" alt="logo" />
        </div>
        <span class="relative top-1 text-xl">部落格後台</span>
      </nuxt-link>
      <nav class="pl-6">
        <nuxt-link v-for="item in topBarNav" :to="item.link" :key="item.link" class="px-2 hover:text-c-orange-800">
          {{ item.name }}
        </nuxt-link>
      </nav>
      <div class="ml-auto">
        <span class="pr-2 text-c-orange-800">mandy 您好</span>
        <button class="text-sm hover:text-c-orange-800">登出</button>
      </div>
    </div>
  </header>
</template>

<script setup>
const topBarNav = [
  {
    link: '/dashboard/posts/public',
    name: '文章管理'
  },
  {
    link: '/dashboard/categories',
    name: '分類管理'
  }
];
</script>

<style lang="scss" scoped></style>
