<template>
  <header class="w-full bg-c-brown-800 text-white shadow">
    <div class="c-container flex items-center">
      <nuxt-link to="/" class="flex items-center">
        <div class="mr-2 inline-block h-10 w-10 align-middle">
          <img class="border-soild border-2 border-c-brown-800" src="/static/images/logo.svg" alt="logo" />
        </div>
        <span class="text-base">{{ webTitle }}</span>
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
const webTitle = useState('webTitle');
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
