<script setup>
import { usePostsStore } from '@/stores/index';

const $postsStore = usePostsStore();
const caseConditions = computed(() => $postsStore.conditions);

const { params } = useRoute();

(async () => {
  const postsCase = await $postsStore.getPostsCase(params.id);
  if (postsCase.status !== 'success') {
    showFailToast(postsCase.message);
    await navigateTo('/');
  }
})();
</script>
<template>
  <post-content v-bind="caseConditions" :hasTagLinks="true" :hasToc="true" :hasComment="true" />
</template>
