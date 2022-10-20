<template>
  <div>文章內容</div>
</template>

<script setup>
const route = useRoute();
useHead({
  title: route.params.postId
});
</script>

<style lang="scss" scoped></style>
