<template>
  <div class="c-container">
    <post-content v-bind="caseConditions" :hasTagLinks="true" :hasToc="true" :hasComment="true" />
  </div>
</template>

<script setup>
import { usePostStore } from '@/stores/index';

const $postStore = usePostStore();
const caseConditions = computed(() => $postStore.conditions);

const { params } = useRoute();
const res = await $postStore.getPostsCase(params.id);
!res.success && (await navigateTo('/')); // 沒有 id 回首頁
</script>
