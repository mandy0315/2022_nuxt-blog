<template>
  <main class="c-container pt-6 pb-10">
    <div class="flex items-center justify-between">
      <h1 class="c-dashboard-title">文章管理</h1>
      <nuxt-link to="/dashboard/post-edit" class="c-rounded-button c-rounded-button-gray">+ 新增文章</nuxt-link>
    </div>
    <ul class="mt-6">
      <li
        v-for="item in archivesTypes"
        :key="item.type"
        class="mr-1 inline-block rounded-t-lg bg-white py-1 px-4 text-lg text-c-gray-800 hover:opacity-100"
        :class="currType === item.type ? 'opacity-100' : 'opacity-50'"
      >
        <nuxt-link :to="`/dashboard/archives/${item.type}`">{{ item.name }}</nuxt-link>
      </li>
    </ul>
    <nuxt-page />
  </main>
</template>

<script setup>
useHead({
  title: '文章管理'
});
definePageMeta({
  layout: 'dashboard'
});

const archivesTypes = [
  {
    type: 'public',
    name: '公開'
  },
  {
    type: 'draft',
    name: '草稿'
  }
];
const route = useRoute();
const currType = computed(() => route.params.archivesType || '');
</script>

<style lang="scss" scoped></style>
