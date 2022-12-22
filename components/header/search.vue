<template>
  <div class="flex items-center pl-2" :class="{ 'rounded-full border border-solid border-white/40': isOpen }">
    <Icon icon="ion:ios-search-strong" class="mr-1 text-xl" @click="isOpen = !isOpen" />
    <span v-if="isOpen" class="flex items-center">
      <span class="relative">
        <input
          v-model.trim="currentSearch"
          @keyup.enter="
            setCurrentSearch({
              currentPath: '/',
              currentSearch
            })
          "
          type="text"
          placeholder="搜尋文章標題、摘要"
          class="bg-transparent placeholder:text-white/40"
        />
        <span
          v-if="currentSearch"
          class="absolute top-1 right-2 h-full cursor-pointer text-white"
          @click="
            setCurrentSearch({
              currentPath: '/',
              currentSearch: ''
            })
          "
        >
          <Icon icon="ion:close-sharp" />
        </span>
      </span>
      <button
        @click.prevent="
          setCurrentSearch({
            currentPath: '/',
            currentSearch
          })
        "
        class="c-rounded-button c-rounded-button-brown rounded-l-none px-3 text-sm"
      >
        搜尋
      </button>
    </span>
  </div>
</template>

<script setup>
import { usePostSearchStore } from '@/stores/index';

const $postSearchStore = usePostSearchStore();
const { setCurrentSearch } = $postSearchStore;

const isOpen = ref(false);
const currentSearch = computed({
  get: () => $postSearchStore.params.search,
  set: val => ($postSearchStore.params.search = val)
});
</script>
