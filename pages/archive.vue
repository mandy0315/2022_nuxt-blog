<template>
  <div class="c-container">
    <div>
      <ul v-if="tagList.length > 0">
        <li v-for="tag in tagList" :key="tag.name">{{ tag.name }}({{ tag.count }})</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '檔案'
});
const tagList = ref([]);

const { data } = await useFetch('/api/firebase/archive/tags', {
  method: 'get',
  initialCache: false
});
tagList.value = data.value.success && data.value.result.data;
</script>
