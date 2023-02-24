<template>
  <theDropdown
    icon="fluent:arrow-sort-20-filled"
    selectTitle="排序"
    :selectList="[...sortListMap.values()]"
    v-model:value="currSelectedSort"
  />
</template>
<script setup>
import { usePostsListStore } from '@/stores/index';

const $postsListStore = usePostsListStore();

const sortListMap = new Map([
  [0, '新筆記 → 舊筆記'],
  [1, '舊筆記 → 新筆記']
]);
const currSelectedSort = computed({
  get: () => sortListMap.get(+$postsListStore.params.sort),
  set: value => {
    for (let [key, val] of sortListMap.entries()) {
      if (val === value) {
        $postsListStore.setCurrentSort(key);
        break;
      }
    }
  }
});
</script>
