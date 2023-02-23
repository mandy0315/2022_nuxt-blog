<script setup>
useHead({
  title: '所有筆記'
});
const $route = useRoute();

const postListByArchive = useState('postListByArchive', () => []);
const yearsByArchive = useState('yearsByArchive', () => []);
const currYearByArchive = useState('currYearByArchive', () => yearsByArchive.value[0]);

const getYearOfParams = queryStr => (queryStr?.year ? { year: queryStr?.year } : {});

const updateArchiveList = async queryStr => {
  const { data } = await useFetch('/api/firebase/archive/list', {
    method: 'get',
    params: getYearOfParams(queryStr),
    initialCache: false
  });
  if (data.value?.status === 'success') {
    postListByArchive.value = data.value.data?.postList;
    yearsByArchive.value = data.value.data?.years;
  } else {
    console.log(error.value?.data);
    showFailToast(error.value?.data?.statusMessage);
  }
};

watch(currYearByArchive, val => {
  return navigateTo({
    path: $route.path,
    query: { year: val }
  });
});

watch(
  () => $route.query,
  () => {
    updateArchiveList($route.query);
  }
);

updateArchiveList($route.query);
</script>
<template>
  <h1 class="my-10 text-center text-4xl font-bold">所有筆記</h1>

  <NuxtLayout name="aside">
    <div v-if="postListByArchive.length > 0">
      <div class="flex justify-between border-b">
        <h2 class="text-3xl font-bold">{{ postListByArchive[0].year }}年的筆記</h2>
        <the-select-box
          class="mb-1"
          icon="ic:outline-format-list-bulleted"
          v-model:value="currYearByArchive"
          :selectList="yearsByArchive"
        />
      </div>
      <ul v-if="postListByArchive[0].list.length > 0">
        <li v-for="i in postListByArchive[0].list" :key="i.id">
          <nuxt-link :to="`/post/${i.id}`">
            <span>{{ i.update_at_date }}</span>
            <span>{{ i.title }}</span>
          </nuxt-link>
        </li>
      </ul>
      <template v-else><post-list-no-case /></template>
    </div>
  </NuxtLayout>
</template>
