<template>
  <div class="flex">
    <div
      class="relative grow rounded-l border-t border-b border-l border-solid border-c-gray-200 py-1 pl-2 text-c-gray-400"
    >
      <input
        v-model.trim="currentSearch"
        @keyup.enter="
          setCurrentSearch({
            currentSearch
          })
        "
        type="text"
        placeholder="搜尋文章標題、摘要"
        autocomplete="off"
        class="w-full"
      />
      <span
        v-if="currentSearch"
        class="absolute top-2 right-2 h-full cursor-pointer text-c-brown-600"
        @click="
          setCurrentSearch({
            currentSearch: ''
          })
        "
      >
        <Icon icon="ion:close-sharp" />
      </span>
    </div>
    <button
      @click.prevent="
        setCurrentSearch({
          currentSearch
        })
      "
      class="c-rounded-button c-rounded-button-brown w-18 rounded-r rounded-l-none"
    >
      搜尋
    </button>
  </div>
</template>

<script setup>
import { usePostSearchStore } from '@/stores/index';

const $postSearchStore = usePostSearchStore();
const { setCurrentSearch } = $postSearchStore;

const currentSearch = computed({
  get: () => $postSearchStore.params.search,
  set: val => ($postSearchStore.params.search = val)
});
</script>
