<template>
  <div class="c-container">
    <section class="py-10">
      <h1 class="text-center text-4xl font-bold">Mandy's 技術與生活筆記</h1>
    </section>
    <section class="px-10">
      <theSearch class="mx-auto max-w-md" />
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
    </section>
  </div>
</template>

<script setup>
import { usePostSearchStore } from '@/stores/index';

const $postSearchStore = usePostSearchStore();
const $route = useRoute();

const currentPostList = computed(() => $postSearchStore.postList.articleList);
const totalPages = computed(() => $postSearchStore.postList?.pageInfo?.pages);

const currentPage = computed({
  get: () => +$postSearchStore.params.page,
  set: val => $postSearchStore.setCurrentPage(val)
});

watch(
  () => $route.query,
  () => {
    $postSearchStore.getPostsList($route.query);
  }
);

$postSearchStore.getPostsList($route.query);
</script>
