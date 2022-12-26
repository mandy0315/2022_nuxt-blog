<template>
  <div class="c-container flex">
    <div class="grow"></div>
    <div class="w-72">
      <h2 class="mb-2 text-c-gray-400"><Icon icon="ion:pricetags" class="-mt-1 mr-2 inline-block" />標籤</h2>
      <ul v-if="tagList.length > 0">
        <li v-for="tag in tagList" :key="tag.name">
          <theTag :name="tag.name" :number="tag.count" :isActive="currentTag === tag.name" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';

useHead({
  title: '檔案'
});
const tagList = useState('tagList', () => []);

const getTagList = async () => {
  const { data } = await useFetch('/api/firebase/archive/getAllTags', {
    method: 'get',
    initialCache: false
  });
  tagList.value = data.value.success && data.value.result.data;
};

getTagList();

const $route = useRoute();
const currentTag = computed(() => $route.query.tag || 'all');
</script>
