<template>
  <div>
    <form>
      <ClientOnly>
        <div class="my-4 grid grid-cols-2 gap-4 rounded bg-white px-6 pb-10 pt-6">
          <label class="pb-4">
            <p class="pb-1 pr-4 text-lg">標題</p>
            <input
              v-model.lazy="fillTitle"
              type="text"
              class="form-input w-full rounded border-c-gray-400"
              placeholder="請輸入標題"
            />
          </label>

          <label class="inline-block pb-4">
            <p class="pb-1 pr-4 text-lg">分類</p>
            <template v-if="categorieList.length > 0">
              <select v-model="selectCategory" class="form-select w-full rounded border-c-gray-400">
                <option v-for="category in categorieList" :value="category.name">{{ category.name }}</option>
              </select>
            </template>
            <template v-else>
              <p>請先新增分類</p>
            </template>
          </label>
          <md-editor
            class="col-span-2"
            v-model="postInfo.content"
            code-theme="github"
            preview-theme="github"
            language="zh-tw"
            :toolbars="toolbars"
          ></md-editor>
        </div>
        <!-- button -->
        <div class="text-right">
          <div class="relative inline-block">
            <button @click.prevent="sendForm" class="c-rounded-button c-rounded-button-gray rounded-r-none rounded-l">
              {{ currSubmitName }}
            </button>
            <button
              ref="container_el"
              @click.prevent="toggleList"
              class="c-rounded-button c-rounded-button-gray rounded-l-none rounded-r border-l border-solid border-c-gray-400/50 px-2"
            >
              <Icon v-if="isOpen" icon="material-symbols:arrow-drop-down" class="inline-block" />
              <Icon v-else icon="material-symbols:arrow-drop-up" class="inline-block" />

              <div
                v-if="isOpen"
                class="absolute left-0 bottom-[36px] w-full rounded border border-c-gray-400 bg-white p-2 text-center shadow-lg"
              >
                <button
                  v-for="item in submitList"
                  :key="item.status"
                  class="block w-full py-1 text-c-gray-800 hover:opacity-50"
                  @click.prevent="selectSubmitStatus = item.status"
                >
                  {{ item.name }}
                </button>
              </div>
            </button>
          </div>
        </div>
      </ClientOnly>
    </form>
  </div>
</template>

<script setup>
import { useCategoriesStore } from '@/stores/index';
import { computed, onMounted, reactive } from 'vue';

const route = useRoute();
const { isOpen, toggleList, setContainer } = useToggle();

const postInfo = reactive({
  id: '',
  title: '',
  category: '',
  content: '使用 Markdown 語法，填寫你的內容...',
  status: 'draft'
});

const routeName = computed(() => route.name);

// 標題填寫
const fillTitle = computed({
  get: () => postInfo.title,
  set: val => {
    postInfo.title = val;
  }
});

// 按鈕選擇
const container_el = ref(null);
const submitList = [
  {
    name: '儲存草稿',
    status: 'draft'
  },
  {
    name: '公開文章',
    status: 'public'
  }
];
const currSubmitName = computed(() => submitList.filter(item => item.status === postInfo.status)[0].name);
const selectSubmitStatus = computed({
  get: () => postInfo.status,
  set: val => {
    postInfo.status = val;
  }
});
onMounted(() => {
  setContainer(container_el.value);
});

// md-editor-v3
const toolbars = [
  '-',
  'title',
  'strikeThrough',
  'bold',
  'underline',
  'italic',
  '-',
  'quote',
  'unorderedList',
  'orderedList',
  'codeRow',
  'code',
  'link',
  // 'image',
  'table',
  '-',
  'preview'
];

// 分類選擇
const $categoriesStore = useCategoriesStore();
const categorieList = computed(() => $categoriesStore.categorieList);
const selectCategory = computed({
  get: () => postInfo.category,
  set: val => {
    postInfo.category = val;
  }
});
// 分類
if (categorieList.value.length === 0) {
  await $categoriesStore.updateCategorieList();
}
selectCategory.value = selectCategory.value || categorieList.value[0].name;

// 送出
const { nowToISO } = useDateTime();
const { addFirebaseData, getFirebaseDocData, updateFirebaseData } = useFirebase();

const $router = useRouter();
const sendForm = async () => {
  postInfo['update_time'] = nowToISO;

  switch (routeName.value) {
    case 'dashboard-post-edit':
      const data1 = await addFirebaseData('posts', postInfo);
      data1.success && $router.push({ path: `/dashboard/posts/post-edit/${data1.id}` });
      break;
    default:
      const data2 = await updateFirebaseData('posts', postInfo.id, postInfo);
      data2.success && $router.push({ path: `/dashboard/posts/post-edit/${data2.id}` });
      break;
  }
};

// 初始
const initPage = async () => {
  // 判斷是文章編輯頁執行
  if (routeName.value === 'dashboard-post-edit-id') {
    postInfo.id = route.params.id;

    const data = await getFirebaseDocData('posts', postInfo.id);
    if (data.success) {
      Object.assign(postInfo, data.result);
    } else {
      $router.push({ path: `/dashboard/posts/public` });
    }
  }
};
initPage();
</script>

<style lang="scss" scoped></style>
