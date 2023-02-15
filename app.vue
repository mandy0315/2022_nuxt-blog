<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>

<script setup>
const config = useRuntimeConfig();

useHead({
  titleTemplate: title => {
    return title ? `${title}-${config.public.WEBSITE_TITLE}` : config.public.WEBSITE_TITLE;
  }
});
</script>
