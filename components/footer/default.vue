<template>
  <footer class="py-2 text-center text-c-gray-200">
    <span
      >© 2022-2023
      <nuxt-link to="/" class="underline hover:text-c-brown-200">{{ config.public.WEBSITE_TITLE }}</nuxt-link
      >. All rights reserved</span
    >
    <span>
      | File from
      <a
        class="underline hover:text-c-brown-200"
        href="https://github.com/mandy0315/2022_nuxt-blog"
        target="_blank"
        rel="noopener noreferrer"
        >2022_nuxt-blog</a
      ></span
    >
  </footer>
</template>

<script setup>
const config = useRuntimeConfig();
</script>
