<template>
  <main class="c-container pt-6 pb-10">
    <div class="flex items-center justify-between">
      <h1 class="c-dashboard-title">文章管理</h1>
      <nuxt-link to="/dashboard/posts/post-edit" class="c-rounded-button c-rounded-button-gray">+ 新增文章</nuxt-link>
    </div>
    <ul class="mt-6">
      <li
        v-for="item in postsStateList"
        :key="item.state"
        class="mr-1 inline-block rounded-t-lg bg-white py-1 px-4 text-lg text-c-gray-800 hover:opacity-100"
        :class="currState === item.state ? 'opacity-100' : 'opacity-50'"
      >
        <nuxt-link :to="`/dashboard/posts/${item.state}`">{{ item.name }}</nuxt-link>
      </li>
    </ul>

    <nuxt-page />
  </main>
</template>

<script setup>
definePageMeta({
  middleware: [
    (to, form) => {
      if (to.path === '/dashboard/posts') {
        return navigateTo('/dashboard/posts/public');
      }
    }
  ]
});

const postsStateList = [
  {
    state: 'public',
    name: '公開'
  },
  {
    state: 'draft',
    name: '草稿'
  }
];
const route = useRoute();
const currState = computed(() => route.params.postsState);
</script>

<style lang="scss" scoped></style>
