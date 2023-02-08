<template>
  <div>
    <div>
      <p>關於我</p>
    </div>
    <div>
      <p>標籤</p>
      <ul v-if="tagList.length > 0">
        <li v-for="tag in tagList" :key="tag.name" class="inline-block">
          <nuxt-link :to="`/tag/${tag.name}`">
            <theTag :name="tag.name" :number="tag.count" />
          </nuxt-link>
        </li>
      </ul>
      <div v-else>目前沒有標籤喔～</div>
    </div>
  </div>
</template>

<script setup>
import { showFailToast } from 'vant';

const tagList = useState('tagList', () => []);

const getTagList = async () => {
  const { data, error } = await useFetch('/api/firebase/tag/list', {
    method: 'get',
    initialCache: false
  });
  if (data.value?.status === 'success') {
    tagList.value = data.value?.data?.list;
    console.log(tagList.value);
  } else {
    console.log(error.value?.data);
    showFailToast(error.value?.data?.statusMessage);
  }
};

getTagList();
</script>
