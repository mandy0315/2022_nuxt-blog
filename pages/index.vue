<script setup>
import { usePostsListStore } from '@/stores/index';

const $postsListStore = usePostsListStore();
const $route = useRoute();

const currentPostList = computed(() => $postsListStore.postList.list);
const totalPages = computed(() => $postsListStore.postList?.pageInfo?.pages);

const currentPage = computed({
  get: () => +$postsListStore.params.page,
  set: val => $postsListStore.setCurrentPage(val)
});

watch(
  () => $route.query,
  () => {
    $postsListStore.updatePostsList('index', $route.query);
  }
);

$postsListStore.updatePostsList('index', $route.query);
</script>
<template>
  <div>
    <h1 class="my-10 text-center text-4xl font-bold">Mandy's 技術與生活筆記</h1>

    <NuxtLayout name="aside">
      <post-list-sort class="ml-auto" />
      <template v-if="currentPostList.length > 0">
        <ul class="w-full pb-6">
          <li v-for="item in currentPostList" :key="item.id" class="block border-b border-c-line-gray py-5">
            <post-list v-bind="item" :hasLinks="true" />
          </li>
        </ul>
        <div v-if="+totalPages">
          <the-pagination v-model:currentPage="currentPage" :totalPages="+totalPages" />
        </div>
      </template>
      <template v-else-if="currentPostList.length === 0"><post-list-no-case /></template>
    </NuxtLayout>
  </div>
</template>
