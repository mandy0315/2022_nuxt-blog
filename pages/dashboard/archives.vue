<template>
  <div class="bg-white">
    <div class="my-6 flex flex-col items-center">
      <div class="my-4 flex space-x-4">
        <nuxt-link to="/dashboard/archives/public">公開</nuxt-link>
        <nuxt-link to="/dashboard/archives/draft">草稿</nuxt-link>
      </div>
    </div>
    <div class="border-b-2 border-gray-100" />
    <div class="flex flex-col items-center">
      <nuxt-page />
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '文章編輯'
});
</script>

<style lang="scss" scoped></style>
