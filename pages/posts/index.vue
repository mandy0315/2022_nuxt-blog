<template>
  <div class="flex">
    <div class="w-full">
      <ui-post-list />
    </div>
    <ui-post-sidebar />
  </div>
</template>

<script setup>
useHead({
  title: '文章列表'
});
</script>

<style lang="scss" scoped></style>
