<script setup>
import { useAsideStore } from '@/stores/index';
const $asideStore = useAsideStore();
const { firstWordToUpperCase } = useFormat();

const postList = computed(() => $asideStore.postList);
const tagList = computed(() => $asideStore.tagList);

(() => {
  if (postList.value.length === 0) {
    $asideStore.updateAllList();
  }
})();
</script>
<template>
  <aside>
    <div>
      <p class="text-lg">關於我</p>
    </div>
    <client-only>
      <div>
        <p class="text-lg">最新筆記 <span class="text-sm">( 顯示最新五筆 )</span></p>
        <ul v-if="postList.length > 0">
          <li v-for="post in postList" :key="post.id">
            <nuxt-link :to="`/post/${post.id}`">
              {{ post.title }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div>
        <p>標籤</p>
        <ul v-if="tagList.length > 0">
          <li v-for="tag in tagList" :key="tag.name" class="inline-block">
            <nuxt-link :to="`/tag/${tag.name}`" class="c-round-btn c-round-btn-default">{{
              firstWordToUpperCase(tag.name)
            }}</nuxt-link>
          </li>
        </ul>
        <div v-else>目前沒有標籤喔～</div>
      </div>
    </client-only>
  </aside>
</template>
