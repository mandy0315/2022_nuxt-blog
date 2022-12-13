<template>
  <div class="c-container">
    <section class="py-10">
      <h1 class="text-center text-4xl font-bold">{{ webTitle }}</h1>
    </section>
    <section class="px-10">
      <ul v-if="currPostList.length > 0" class="w-full">
        <li v-for="item in currPostList" :key="item.id" class="block border-b border-c-gray-400 py-5">
          <post-list v-bind="item" :hasLinks="true" />
        </li>
      </ul>
    </section>

    <div v-if="totalPages" class="mt-6">
      <the-pagination v-model:currentPages="currentPages" :totalPages="totalPages" />
    </div>
  </div>
</template>

<script setup>
import { useMainStore, usePostStore } from '@/stores/index';

const currentPages = ref(0);
const totalPages = 12;

const $mainStore = useMainStore();
const $postStore = usePostStore();

const webTitle = computed(() => $mainStore.webTitle);
const currPostList = computed(() => $postStore.postList);

$postStore.getPostList({ state: 'public' });
</script>
