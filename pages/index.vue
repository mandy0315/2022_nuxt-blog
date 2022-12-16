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
      <div v-if="+pager?.pages">
        <the-pagination v-model:currentPages="currentPages" :totalPages="+pager?.pages" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useMainStore, usePostStore } from '@/stores/index';

const $mainStore = useMainStore();
const $postStore = usePostStore();

const webTitle = computed(() => $mainStore.webTitle);

const currPostList = ref([]);
const currentPages = ref(1);
const currSort = ref(0);
const pager = ref({});

const getPublicPostList = async (page = 1) => {
  const data = await $postStore.getPostList({ state: 'public', page });
  if (data.success) {
    currPostList.value = data.result?.articleList;
    pager.value = data.result?.pageInfo;
  }
};

watchEffect(() => {
  getPublicPostList(currentPages.value);
});
</script>
