<template>
  <div class="c-container">
    <div class="flex items-center justify-between">
      <h1 class="c-title">文章管理</h1>
      <nuxt-link to="/dashboard/post-edit" class="c-rounded-button c-rounded-button-brown">+ 新增文章</nuxt-link>
    </div>
    <div class="flex items-end">
      <ul class="mt-6 inline-block">
        <li
          v-for="item in postsStateList"
          :key="item.state"
          class="mr-1 inline-block rounded-t-lg bg-white py-1 px-4 text-lg text-c-gray-800 hover:opacity-100"
          :class="currentState === item.state ? 'opacity-100' : 'opacity-50'"
        >
          <nuxt-link :to="`/dashboard/posts-${item.state}`">{{ item.name }}</nuxt-link>
        </li>
      </ul>
      <theSearch class="w-86 ml-auto mr-4 h-9 w-80" />
      <theSortList />
    </div>
    <section class="w-full rounded-b-md rounded-tr-md bg-white p-6">
      <table class="w-full">
        <thead class="bg-c-gray-400 text-c-gray-800">
          <tr>
            <th scope="row" class="w-5/6 py-2">文章資訊</th>
            <th scope="row" class="w-1/6 py-2">管理</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="currentPostList.length > 0">
            <tr v-for="item in currentPostList" :key="item.id" class="border-b border-solid border-c-gray-400">
              <td scope="col" class="p-4 text-c-gray-600">
                <post-list v-bind="item" />
              </td>
              <td class="p-4">
                <nuxt-link
                  :to="`/dashboard/post-edit/${item.id}`"
                  class="c-border-button c-border-button-brown my-1 w-full text-center"
                >
                  編輯
                </nuxt-link>
                <button
                  @click.prevent="openPreviewPost(item.id)"
                  class="c-border-button c-border-button-brown my-1 w-full"
                >
                  預覽
                </button>
                <button @click.prevent="deletePost(item.id)" class="c-border-button c-border-button-red my-1 w-full">
                  刪除
                </button>
              </td>
            </tr>
          </template>
          <template v-else-if="currentPostList.length === 0">
            <tr>
              <td colspan="2"><post-no-case /></td>
            </tr>
          </template>
        </tbody>
      </table>
      <div v-if="+totalPages" class="mt-6">
        <the-pagination v-model:currentPage="currentPage" :totalPages="+totalPages" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { $vfm } from 'vue-final-modal';
import { usePostStore, usePostSearchStore } from '@/stores/index';
import CustomModal from '@/components/customModal.vue';
import PostContent from '@/components/post/content/index.vue';

useHead({ title: '文章管理' });
definePageMeta({
  middleware: [
    (to, form) => {
      if (!['public', 'draft'].includes(to.params.state)) {
        return navigateTo('/dashboard/posts-public');
      }
    }
  ]
});
const postsStateList = [
  {
    state: 'public',
    name: '公開'
  },
  {
    state: 'draft',
    name: '草稿'
  }
];

const $postStore = usePostStore();
const $postSearchStore = usePostSearchStore();
const $route = useRoute();

const currentState = computed(() => $route.params.state);
const caseConditions = computed(() => $postStore.conditions);

const currentPostList = computed(() => $postSearchStore.postList.articleList);
const totalPages = computed(() => $postSearchStore.postList?.pageInfo?.pages);

const currentPage = computed({
  get: () => +$postSearchStore.params.page,
  set: val => $postSearchStore.setCurrentPage(val)
});

const deletePost = async id => {
  const data = await $postStore.deletePostsCase(id);
  if (data.success) {
    $postSearchStore.setCurrentPage(1);
  }
};

const openPreviewPost = async id => {
  const res = await $postStore.getPostsCase(id);
  res.success &&
    $vfm.show({
      component: CustomModal,
      bind: {
        modalContainerClass: 'c-container h-[600px]',
        modalContentClass: 'mt-8 p-4 overflow-y-scroll'
      },
      on: {},
      slots: {
        default: {
          component: PostContent,
          bind: caseConditions.value
        }
      }
    });
};

const setPostList = () => {
  $route.query.publishState = currentState.value === 'public' ? 'On' : 'Off';
  $postSearchStore.getPostsList($route.query);
};

watch(
  () => $route.query,
  () => {
    setPostList();
  }
);

$postStore.$reset();
setPostList();
</script>
