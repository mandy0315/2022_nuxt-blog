<template>
  <div id="comment">
    <Giscus
      :repo="repo"
      :repoId="repoId"
      category="Announcements"
      :categoryId="categoryId"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="zh-TW"
      loading="lazy"
    />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const repo = config.public.GISCUS_REPO;
const repoId = config.public.GISCUS_REPO_ID;
const categoryId = config.public.GISCUS_CATEGORY_ID;
</script>
