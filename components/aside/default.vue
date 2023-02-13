<template>
  <div>
    <div>
      <p class="text-lg">關於我</p>
    </div>
    <div>
      <p class="text-lg">最新筆記 <span class="text-sm">( 顯示最新五筆 )</span></p>
      <ul v-if="postListByAside.length > 0">
        <li v-for="post in postListByAside" :key="post.id">
          <nuxt-link :to="`/post/${post.id}`">
            {{ post.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div>
      <p class="text-lg">標籤</p>
      <ul v-if="tagListByAside.length > 0">
        <li v-for="tag in tagListByAside" :key="tag.name" class="inline-block">
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

const tagListByAside = useState('tagListByAside', () => []);
const postListByAside = useState('postListByAside', () => []);

const { dateFormat } = useDateTime();

const getTagList = async () => {
  const { data, error } = await useFetch('/api/firebase/tag/list', {
    method: 'get',
    initialCache: false
  });
  if (data.value?.status === 'success') {
    tagListByAside.value = data.value?.data?.list;
  } else {
    console.log(error.value?.data);
    showFailToast(error.value?.data?.message);
  }
};
const getPostsList = async () => {
  const { data, error } = await useFetch('/api/firebase/post/newPostlist', {
    method: 'get',
    initialCache: false
  });
  if (data.value?.status === 'success') {
    postListByAside.value = data.value?.data?.list;
  } else {
    console.log(error.value?.data);
    showFailToast(error.value?.data?.message);
  }
};

(async () => {
  await getTagList();
  await getPostsList();
})();
</script>
