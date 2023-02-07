<template>
  <div class="c-container">
    <div class="mr-4">
      <h1 class="c-title pb-3">檔案</h1>
      <div v-if="postListByArchive.length > 0">
        <h2>{{ postListByArchive[0].year }}年的筆記</h2>
        <ul>
          <li v-for="i in postListByArchive[0].list" :key="i.id">
            <nuxt-link :to="`/post/${i.id}`">
              <span>{{ i.update_at_date }}</span>
              <span>{{ i.title }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '檔案'
});
const postListByArchive = useState('postListByArchive', () => []);
const yearsByArchive = useState('yearsByArchive', () => []);

const $route = useRoute();

const getArchiveList = async queryStr => {
  const { data } = await useFetch('/api/firebase/archive/list', {
    method: 'get',
    params: {
      year: '2023'
    },
    initialCache: false
  });
  if (data.value?.status === 'success') {
    postListByArchive.value = data.value.data?.postList;
    yearsByArchive.value = data.value.data?.years;
  } else {
    console.log(error.value?.data);
    // showFailToast(error.value?.data?.statusMessage);
  }
};

watch(
  () => $route.query,
  () => {
    getArchiveList($route.query);
  }
);

getArchiveList($route.query);
</script>
