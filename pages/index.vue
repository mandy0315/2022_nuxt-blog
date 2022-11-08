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
  </div>
</template>

<script setup>
const { getPostsPublicListAPI } = useFirebase();
const postsList = useState(() => []);

const data = await getPostsPublicListAPI();
postsList.value = data.result || [];
</script>

<style lang="scss" scoped></style>
