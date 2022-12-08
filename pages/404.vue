<template>
  <main class="c-container pt-6 pb-10">
    <h1
      class="pb-4 text-6xl font-bold after:mx-auto after:mt-4 after:block after:h-1 after:w-10 after:bg-c-orange-800 after:content-['']"
    >
      404
    </h1>
    <p class="mb-6 text-xl font-medium">找不到此頁面</p>
  </main>
</template>

<script setup>
useHead({ title: '404' });
definePageMeta({
  layout: false
});
</script>

<style lang="scss" scoped></style>
