<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
  <modals-container />
</template>

<script setup>
useHead({
  title: '',
  titleTemplate: title => {
    return title ? `${title}-Mandy 部落格` : 'Mandy 部落格';
  },
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
