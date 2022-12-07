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
    return title ? `${title}-Mandy 生活&技術筆記` : 'Mandy 生活&技術筆記';
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
      href: '/static/images/logo.ico'
    }
  ]
});
useState('webTitle', () => 'Mandy 生活&技術筆記');
</script>

<style lang="scss" scoped></style>
