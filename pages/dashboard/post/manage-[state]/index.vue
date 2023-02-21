<template>
  <div class="c-container">
    <div class="flex items-center justify-between">
      <h1 class="c-title">文章管理</h1>
      <nuxt-link to="/dashboard/post/edit" class="c-rounded-button c-rounded-button-brown">+ 新增文章</nuxt-link>
    </div>
    <div class="flex items-end">
      <ul class="mt-6 inline-block">
        <li
          v-for="item in postsStateList"
          :key="item.state"
          class="mr-1 inline-block rounded-t-lg bg-white py-1 px-4 text-lg text-c-black-200 hover:opacity-100"
          :class="currentState === item.state ? 'opacity-100' : 'opacity-50'"
        >
          <nuxt-link :to="`/dashboard/post/manage-${item.state}`">{{ item.name }}</nuxt-link>
        </li>
      </ul>
      <post-list-search class="w-86 ml-auto mr-4 h-9 w-80" />
      <post-list-sort />
    </div>
    <section class="w-full rounded-b-md rounded-tr-md bg-white p-6">
      <table class="w-full">
        <thead class="bg-c-gray-200 text-c-black-200">
          <tr>
            <th scope="row" class="w-5/6 py-2">文章資訊</th>
            <th scope="row" class="w-1/6 py-2">管理</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="currentPostList.length > 0">
            <tr v-for="item in currentPostList" :key="item.id" class="border-b border-solid border-c-gray-200">
              <td scope="col" class="p-4 text-c-black-100">
                <post-list v-bind="item" />
              </td>
              <td class="p-4">
                <nuxt-link
                  :to="`/dashboard/post/edit/${item.id}`"
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
            <div v-if="+totalPages" class="mt-6">
              <the-pagination v-model:currentPage="currentPage" :totalPages="+totalPages" />
            </div>
          </template>
          <template v-else-if="currentPostList.length === 0">
            <tr>
              <td colspan="2"><post-list-no-case /></td>
            </tr>
          </template>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { $vfm } from 'vue-final-modal';
import { usePostsStore, usePostsListStore } from '@/stores/index';
import CustomModal from '@/components/customModal.vue';
import PostContent from '@/components/post/content/index.vue';

useHead({ title: '文章管理' });
definePageMeta({
  middleware: [
    (to, form) => {
      if (!['public', 'draft'].includes(to.params.state)) {
        return navigateTo('/dashboard/post/manage-public');
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

const $postsStore = usePostsStore();
const $postsListStore = usePostsListStore();
const $route = useRoute();

const currentState = computed(() => $route.params.state);
const caseConditions = computed(() => $postsStore.conditions);

const currentPostList = computed(() => $postsListStore.postList.list);
const totalPages = computed(() => $postsListStore.postList?.pageInfo?.pages);

const currentPage = computed({
  get: () => +$postsListStore.params.page,
  set: val => $postsListStore.setCurrentPage(val)
});

const deletePost = id => {
  const beforeClose = async action => {
    if (action === 'confirm') {
      closeDialog();
      const postsCase = await $postsStore.deletePostsCase(id);
      console.log('test=>', postsCase);
      if (postsCase.status === 'success') {
        showSuccessToast(postsCase.message);
        $postsListStore.setCurrentPage(1);
      } else {
        showFailToast(postsCase.message);
      }
    } else {
      closeDialog();
    }
  };
  showConfirmDialog({
    title: '請確認是否要刪除筆記?',
    message: '確認刪除後，無法再復原文章，請慎重考慮',
    confirmButtonText: '確認',
    beforeClose
  });
};

const openPreviewPost = async id => {
  const postsCase = await $postsStore.getPostsCase(id);
  if (postsCase.status === 'success') {
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
  } else {
    showFailToast(postsCase.message);
  }
};

watch(
  () => $route.query,
  val => {
    $postsListStore.updatePostsList('manage', val);
  }
);

$postsListStore.updatePostsList('manage', $route.query);
</script>
