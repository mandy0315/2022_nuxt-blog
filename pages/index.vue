<template>
  <div class="flex items-start">
    <ul v-if="postsList.length > 0">
      <li v-for="item in postsList" :key="item.id" class="group block border-b border-c-gray-400 py-5">
        <post-list v-bind="item" />
      </li>
    </ul>
  </div>
</template>

<script setup>
const { getPostsPublicListAPI } = firebaseAPIs();
const postsList = useState(() => []);

const getPostsList = async () => {
  const data = await getPostsPublicListAPI();
  postsList.value = data.result || [];
};
getPostsList();
</script>

<style lang="scss" scoped></style>
