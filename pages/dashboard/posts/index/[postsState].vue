<template>
  <section class="w-full rounded-b-md rounded-tr-md bg-white p-6">
    <table>
      <thead class="bg-c-gray-800 text-white">
        <tr>
          <th scope="row" class="w-5/6 py-2">文章資訊</th>
          <th scope="row" class="w-1/6 py-2">管理</th>
        </tr>
      </thead>
      <tbody v-if="postsList.length > 0">
        <tr v-for="item in postsList" class="border-b border-solid border-c-gray-400">
          <td scope="col" class="p-4 text-c-gray-600">
            <ui-post-item v-bind="item" />
          </td>
          <td class="p-4">
            <nuxt-link
              :to="`/dashboard/posts/post-edit/${item.id}`"
              class="c-border-button c-border-button-gray my-1 w-full text-center"
            >
              編輯
            </nuxt-link>
            <button class="c-border-button c-border-button-gray my-1 w-full">預覽</button>
            <button @click.prevent="deleteCase(item.id)" class="c-border-button c-border-button-red my-1 w-full">
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: [
    (to, form) => {
      if (!['public', 'draft'].includes(to.params.postsState)) {
        return navigateTo('/dashboard/posts/public');
      }
    }
  ]
});

const route = useRoute();
const currState = computed(() => route.params.postsState);
const postsList = useState(() => []);

const deleteCase = id => {
  console.log('caseId=>', id);
};

// 初始-取的資料
const { getPostsPublicListAPI, getPostsDraftListAPI } = useFirebase();
const getPostsListData = {
  public: async () => {
    const data = await getPostsPublicListAPI();
    return data.result;
  },
  draft: async () => {
    const data = await getPostsDraftListAPI();
    return data.result;
  }
};
const init = async () => {
  const data = await getPostsListData[currState.value]();
  postsList.value = data;
};
init();
</script>

<style lang="scss" scoped></style>
