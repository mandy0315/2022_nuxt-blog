<template>
  <div>
    <section class="py-10">
      <h1 class="text-center text-3xl text-c-brown-800">{{ webTitle }}</h1>
    </section>
    <section class="px-10">
      <ul v-if="postsList.length > 0" class="w-full">
        <li v-for="item in postsList" :key="item.id" class="group block border-b border-c-gray-400 py-5">
          <post-list v-bind="item" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
const webTitle = useState('webTitle');
const { getPostsPublicListAPI } = firebaseAPIs();
const postsList = useState(() => []);

const getPostsList = async () => {
  const data = await getPostsPublicListAPI();
  postsList.value = data.result || [];
};
getPostsList();
</script>

<style lang="scss" scoped></style>
