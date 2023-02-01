<template>
  <div class="c-container">
    <post-content v-bind="caseConditions" :hasTagLinks="true" :hasToc="true" :hasComment="true" />
  </div>
</template>

<script setup>
import { usePostsStore } from '@/stores/index';

const $postsStore = usePostsStore();
const caseConditions = computed(() => $postsStore.conditions);

const { params } = useRoute();
const res = await $postsStore.getPostsCase(params.id);
!res.success && (await navigateTo('/')); // 沒有 id 回首頁
</script>
