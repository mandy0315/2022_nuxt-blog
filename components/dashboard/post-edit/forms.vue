<template>
  <div>
    <form>
      <ClientOnly>
        <section class="my-4 grid grid-cols-2 gap-4 rounded bg-white px-6 pb-10 pt-6">
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
        </section>
        <div class="text-right">
          <div class="relative inline-block">
            <button
              @click.prevent="sendForm"
              class="c-rounded-button rounded-r-none rounded-l"
              :class="postInfo.status === 'delete' ? 'c-rounded-button-red' : 'c-rounded-button-gray'"
            >
              {{ currSubmitName }}
            </button>
            <div
              ref="container_el"
              @click="toggleList"
              class="c-rounded-button rounded-l-none rounded-r border-l border-solid border-c-gray-400/50 px-2"
              :class="postInfo.status === 'delete' ? 'c-rounded-button-red' : 'c-rounded-button-gray'"
            >
              <Icon v-if="isOpen" icon="material-symbols:arrow-drop-down" class="inline-block" />
              <Icon v-else icon="material-symbols:arrow-drop-up" class="inline-block" />

              <div
                v-if="isOpen"
                class="absolute left-0 bottom-[36px] w-full rounded border border-c-gray-400 bg-white p-2 text-center shadow-lg"
              >
                <template v-for="item in submitList" :key="item.status">
                  <button
                    v-if="item.isShow"
                    class="block w-full py-1 hover:opacity-50"
                    :class="item.status === 'delete' ? 'text-red-700' : 'text-c-gray-800'"
                    @click.prevent="selectSubmitStatus = item.status"
                  >
                    {{ item.name }}
                  </button>
                </template>
              </div>
            </div>
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
    status: 'draft',
    isShow: true
  },
  {
    name: '公開文章',
    status: 'public',
    isShow: true
  },
  {
    name: '刪除文章',
    status: 'delete',
    isShow: routeName.value === 'dashboard-post-edit-id'
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
const { addFirebaseData, getFirebaseDocData } = useFirebase();

const $router = useRouter();
const sendForm = async () => {
  postInfo['update_time'] = nowToISO;

  switch (routeName.value) {
    case 'dashboard-post-edit':
      const data = await addFirebaseData('posts', postInfo);

      data.success && $router.push({ path: `/dashboard/post-edit/${data.id}` });
      break;
    default:
      break;
  }
};

// 初始
const initPage = async () => {
  // id
  if (routeName.value === 'dashboard-post-edit-id') {
    postInfo.id = route.params.id;

    const data = await getFirebaseDocData('posts', postInfo.id);
    if (data.success) {
      Object.assign(postInfo, data.result);
    } else {
      $router.push({ path: `/dashboard/archives/public` });
    }
  }
};
initPage();
</script>

<style lang="scss" scoped></style>
