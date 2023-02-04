<template>
  <div class="c-container">
    <section class="py-10">
      <h1 class="text-center text-4xl font-bold">Mandy's 技術與生活筆記</h1>
    </section>
    <section class="grid grid-cols-12 gap-10">
      <div class="col-span-9">
        <theSortList class="ml-auto" />
        <template v-if="currentPostList.length > 0">
          <ul class="w-full pb-6">
            <li v-for="item in currentPostList" :key="item.id" class="block border-b border-c-gray-400 py-5">
              <post-list v-bind="item" :hasLinks="true" />
            </li>
          </ul>
          <div v-if="+totalPages">
            <the-pagination v-model:currentPage="currentPage" :totalPages="+totalPages" />
          </div>
        </template>
        <template v-else-if="currentPostList.length === 0"><post-no-case /></template>
      </div>
      <div class="col-span-3">
        <the-aside />
      </div>
    </section>
  </div>
</template>

<script setup>
import { usePostsListStore } from '@/stores/index';

const $postsListStore = usePostsListStore();
const $route = useRoute();

const currentPostList = computed(() => $postsListStore.postList.articleList);
const totalPages = computed(() => $postsListStore.postList?.pageInfo?.pages);

const currentPage = computed({
  get: () => +$postsListStore.params.page,
  set: val => $postsListStore.setCurrentPage(val)
});

watch(
  () => $route.query,
  () => {
    $postsListStore.getPostsList($route.query);
  }
);

$postsListStore.getPostsList($route.query);
</script>
