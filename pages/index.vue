<template>
  <div class="c-container">
    <section class="py-10">
      <h1 class="text-center text-4xl font-bold">{{ webTitle }}</h1>
    </section>
    <section class="px-10">
      <theSortList v-model:sort="currSort" />
      <ul v-if="currPostList.length > 0" class="w-full pb-6">
        <li v-for="item in currPostList" :key="item.id" class="block border-b border-c-gray-400 py-5">
          <post-list v-bind="item" :hasLinks="true" />
        </li>
      </ul>
      <div v-if="+pages">
        <the-pagination v-model:currentPage="currentPage" :totalPages="+pages" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useMainStore, usePostSearchStore } from '@/stores/index';
import { computed } from '@vue/reactivity';

const $mainStore = useMainStore();
const $postSearchStore = usePostSearchStore();
const $route = useRoute();

const webTitle = computed(() => $mainStore.webTitle);

const currPostList = computed(() => $postSearchStore.postList.articleList);

const pages = computed(() => $postSearchStore.postList?.pageInfo?.pages);

const currSort = computed({
  get: () => +$postSearchStore.params.sort,
  set: val => $postSearchStore.setCurrentSort(val)
});
const currentPage = computed({
  get: () => +$postSearchStore.params.page,
  set: val => $postSearchStore.setCurrentPage(val)
});

watchEffect(() => {
  $route.query.publishState = 'On';
  $postSearchStore.getPostList($route.query);
});
</script>
