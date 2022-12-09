<template>
  <div class="c-container">
    <section class="py-10">
      <h1 class="text-center text-3xl text-c-brown-800">{{ webTitle }}</h1>
    </section>
    <section class="px-10">
      <ul v-if="currPostList.length > 0" class="w-full">
        <li v-for="item in currPostList" :key="item.id" class="group block border-b border-c-gray-400 py-5">
          <post-list v-bind="item" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { useMainStore, usePostStore } from '@/stores/index';
import { computed } from '@vue/reactivity';

const $mainStore = useMainStore();
const $postStore = usePostStore();

const webTitle = computed(() => $mainStore.webTitle);
const currPostList = computed(() => $postStore.postList);

$postStore.getPostList();
</script>

<style lang="scss" scoped></style>
