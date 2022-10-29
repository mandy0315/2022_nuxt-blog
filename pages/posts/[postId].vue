<template>
  <div>
    <ui-breadcrumb />
    <div class="mb-4 py-4">
      <h3 class="pb-2 text-2xl text-c-orange-800">文章標題</h3>
      <div class="text-sm">
        <span class="pr-3"><Icon icon="ic:outline-access-time" class="mr-1 inline-block" />2022/10/23 </span>
        <span><Icon icon="material-symbols:folder-open-outline" class="mr-1 inline-block" />Nuxt </span>
      </div>
    </div>
    <ui-post-image class="mb-4" />
    <md-editor
      editor-id="my-editor"
      v-model="postContent"
      code-theme="github"
      preview-theme="github"
      class="!bg-transparent"
      :theme="$colorMode.value"
      previewOnly
    />
  </div>
</template>

<script setup>
const route = useRoute();
useHead({
  title: route.params.postId
});

const postContent = ref('## Hello Editor!');
</script>

<style lang="scss" scoped></style>
