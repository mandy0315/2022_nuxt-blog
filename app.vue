<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>

<script setup>
useHead({
  meta: [
    {
      name: 'description',
      content: '這是一個 Nuxt3 的練習 Blog'
    },
    {
      name: 'author',
      content: 'mandy'
    },
    {
      name: 'copyright',
      content: '2022.mandy'
    }
  ],
  link: [
    {
      rel: 'shortcut icon',
      href: 'images/icon/logo.ico'
    }
  ]
});
</script>

<style lang="scss" scoped></style>
