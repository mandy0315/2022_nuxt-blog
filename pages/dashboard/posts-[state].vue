<template>
  <div class="c-container">
    <div class="flex items-center justify-between">
      <h1 class="c-dashboard-title">文章管理</h1>
      <nuxt-link to="/dashboard/post-edit" class="c-rounded-button c-rounded-button-brown">+ 新增文章</nuxt-link>
    </div>
    <ul class="mt-6">
      <li
        v-for="item in postsStateList"
        :key="item.state"
        class="mr-1 inline-block rounded-t-lg bg-white py-1 px-4 text-lg text-c-gray-800 hover:opacity-100"
        :class="currState === item.state ? 'opacity-100' : 'opacity-50'"
      >
        <nuxt-link :to="`/dashboard/posts-${item.state}`">{{ item.name }}</nuxt-link>
      </li>
    </ul>
    <section class="w-full rounded-b-md rounded-tr-md bg-white p-6">
      <table class="w-full">
        <thead class="bg-c-gray-400 text-c-gray-800">
          <tr>
            <th scope="row" class="w-5/6 py-2">文章資訊</th>
            <th scope="row" class="w-1/6 py-2">管理</th>
          </tr>
        </thead>
        <tbody v-if="currPostList.length > 0">
          <tr v-for="item in currPostList" :key="item.id" class="border-b border-solid border-c-gray-400">
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
        </tbody>
      </table>
      <div v-if="+pager?.pages" class="mt-6">
        <the-pagination v-model:currentPages="currentPages" :totalPages="+pager?.pages" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { $vfm } from 'vue-final-modal';
import { usePostStore } from '@/stores/index';
import CustomModal from '@/components/customModal.vue';
import PostContent from '@/components/post/content.vue';

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

const route = useRoute();
const $postStore = usePostStore();

const currState = computed(() => route.params.state);
const currConditions = computed(() => $postStore.conditions);

onMounted(() => {
  $postStore.$reset();
});

const currPostList = ref([]);
const currentPages = ref(1);
const pager = ref({});

const pageInit = async (page = 1) => {
  const data = await $postStore.getPostList({ state: currState.value, page });
  if (data.success) {
    currPostList.value = data.result?.articleList;
    pager.value = data.result?.pageInfo;
  }
};

watchEffect(() => {
  pageInit(currentPages.value);
});

const deletePost = async id => {
  const data = await $postStore.deleteCasePost(id);
  if (data.success) {
    pageInit(currentPages.value);
  }
};

const openPreviewPost = async id => {
  const res = await $postStore.getCasePost(id);
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
          bind: currConditions.value
        }
      }
    });
};
</script>
