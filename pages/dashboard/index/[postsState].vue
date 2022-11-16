<template>
  <section class="w-full rounded-b-md rounded-tr-md bg-white p-6">
    <table class="w-full">
      <thead class="bg-c-gray-800 text-white">
        <tr>
          <th scope="row" class="w-5/6 py-2">文章資訊</th>
          <th scope="row" class="w-1/6 py-2">管理</th>
        </tr>
      </thead>
      <tbody v-if="postsList.length > 0">
        <tr v-for="item in postsList" :key="item.id" class="border-b border-solid border-c-gray-400">
          <td scope="col" class="p-4 text-c-gray-600">
            <post-list v-bind="item" />
          </td>
          <td class="p-4">
            <nuxt-link
              :to="`/dashboard/post-edit/${item.id}`"
              class="c-border-button c-border-button-gray my-1 w-full text-center"
            >
              編輯
            </nuxt-link>
            <button @click.prevent="openPreviewPost(item.id)" class="c-border-button c-border-button-gray my-1 w-full">
              預覽
            </button>
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
import { $vfm } from 'vue-final-modal';

import CustomModal from '@/components/customModal.vue';
import PostContent from '@/components/post/content.vue';

definePageMeta({
  middleware: [
    (to, form) => {
      if (!['public', 'draft'].includes(to.params.postsState)) {
        return navigateTo('/dashboard/public');
      }
    }
  ]
});

const route = useRoute();
const currState = computed(() => route.params.postsState);
const postsList = useState(() => []);
const { getPostsPublicListAPI, getPostsDraftListAPI, deletePostsAPI, getPostsAPI } = useFirebase();

// 初始-取的資料
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
const getPostsList = async () => {
  const data = await getPostsListData[currState.value]();
  postsList.value = data || [];
};
getPostsList();

const deleteCase = async id => {
  const data = await deletePostsAPI(id);
  data.success && getPostsList();
};

const openPreviewPost = async id => {
  const data = await getPostsAPI(id);
  data.success &&
    $vfm.show({
      component: CustomModal,
      bind: {
        modalContainerClass: 'max-w-[960px]',
        modalContentClass: 'p-6'
      },
      on: {},
      slots: {
        default: {
          component: PostContent,
          bind: {
            title: data.result.title,
            categories: data.result.categories,
            content: data.result.content,
            update_time: data.result.update_time
          }
        }
      }
    });
};
</script>

<style lang="scss" scoped></style>
