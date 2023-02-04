<template>
  <div class="c-container flex">
    <div class="mr-4 grow">
      <h1 class="c-title pb-3">檔案</h1>
      <ul v-for="year in postsByYear" :key="year">
        <h2 class="py-3 text-2xl font-bold text-c-brown-600">{{ year }}</h2>
        <li v-for="post in postList" :key="post.id">
          <nuxt-link v-if="post.year.includes(year)" :to="`/post/${post.id}`">
            <div class="group block cursor-pointer py-1 px-2 text-xl hover:bg-c-gray-100">
              <span class="pr-2 text-sm text-c-gray-400">{{ post.date }}</span
              ><span class="group-hover:text-c-brown-600">{{ post.title }}</span>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <!-- <div class="w-72">
      <ul v-if="tagList.length > 0">
        <li v-for="tag in tagList" :key="tag.name" class="inline-block">
          <theTag :name="tag.name" :number="tag.count" :isActive="currentTag === tag.name" />
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script setup>
useHead({
  title: '檔案'
});
const tagList = useState('tagList', () => []);
// const postList = useState('postList', () => []);

const $route = useRoute();
const currentTag = computed(() => $route.query.tag || 'all');

const postsByYear = computed(() => {
  const years = [];
  postList.value.forEach(post => {
    years.push(post.year);
  });
  return [...new Set(years)];
});

const getTagList = async () => {
  const { data } = await useFetch('/api/firebase/archive/tagList', {
    method: 'get',
    initialCache: false
  });
  tagList.value = data.value.success && data.value.result.data;
};

const { dateFormat } = useDateTime();
// const getPostsList = async queryStr => {
//   const queryByTag = queryStr.tag || '';

//   const { data } = await useFetch('/api/firebase/archive/postList', {
//     method: 'get',
//     params: {
//       tag: queryByTag
//     },
//     initialCache: false
//   });

//   if (data.value.success) {
//     let posts = data.value.result?.data;

//     posts.forEach(post => {
//       const year = dateFormat(post.update_time, 'YYYY');
//       const date = dateFormat(post.update_time, 'MM/DD');
//       post.date = date; // 新增文章日期欄位
//       post.year = year; // 新增文章年份欄位
//     });
//     postList.value = posts;
//   }
// };

watch(
  () => $route.query,
  () => {
    getPostsList($route.query);
  }
);

getPostsList($route.query);
// getTagList();
</script>
