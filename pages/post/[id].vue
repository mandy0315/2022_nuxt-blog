<script setup>
import { usePostsStore } from '@/stores/index';

const $postsStore = usePostsStore();
const caseConditions = computed(() => $postsStore.conditions);

const { params } = useRoute();

const postsCase = await $postsStore.getPostsCase(params.id);
if (postsCase.status !== 'success') {
  showFailToast(postsCase.message);
  await navigateTo('/');
}
</script>
<template>
  <div class="c-container">
    <post-content v-bind="caseConditions" :hasTagLinks="true" :hasToc="true" />
    <!-- comment -->
    <post-content-comment :postTitle="caseConditions.title" />
  </div>
</template>
