<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
  <modals-container />
</template>

<script setup>
useHead({
  titleTemplate: title => {
    return title ? `${title}-Mandy 生活&技術筆記` : 'Mandy 生活&技術筆記';
  }
});
</script>
