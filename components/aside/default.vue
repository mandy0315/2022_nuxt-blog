<template>
  <div>
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
        <p class="text-lg">標籤</p>
        <ul v-if="tagList.length > 0">
          <li v-for="tag in tagList" :key="tag.name" class="inline-block">
            <nuxt-link :to="`/tag/${tag.name}`">
              <theTag :name="tag.name" :number="tag.count" />
            </nuxt-link>
          </li>
        </ul>
        <div v-else>目前沒有標籤喔～</div>
      </div>
    </client-only>
  </div>
</template>

<script setup>
import { useAsideStore } from '@/stores/index';
const $asideStore = useAsideStore();
const postList = computed(() => $asideStore.postList);
const tagList = computed(() => $asideStore.tagList);

(() => {
  if (postList.value.length === 0) {
    $asideStore.updateAllList();
  }
})();
</script>
