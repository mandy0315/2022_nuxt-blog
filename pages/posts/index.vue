<template>
  <div class="flex items-start">
    <ul>
      <template v-if="postsList.length > 0">
        <li v-for="item in postsList" :key="item.id">
          <nuxt-link :to="`/posts/${item.id}`" class="group block border-b border-c-gray-400 py-5">
            <ui-post-list v-bind="item" />
          </nuxt-link>
        </li>
      </template>
    </ul>
    <ui-post-sidebar />
  </div>
</template>

<script setup>
useHead({
  title: '文章列表'
});
const { getPostsPublicListAPI } = useFirebase();
const postsList = useState(() => []);

const init = async () => {
  const data = await getPostsPublicListAPI();
  postsList.value = data.result || [];
};
init();
</script>

<style lang="scss" scoped></style>
