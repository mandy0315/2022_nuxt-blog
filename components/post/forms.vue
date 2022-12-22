<template>
  <div>
    <h1 class="c-dashboard-title">
      {{ editId === '' ? '文章新增' : '文章編輯' }}
    </h1>
    <div class="my-4 grid grid-cols-2 gap-4 rounded bg-white px-6 pb-10 pt-6">
      <form-fill-input v-model:value="titleFill" title="標題" placeholder="請輸入標題" class="col-span-1" />
      <form-file-input v-model:value="coverPictureChoosed" title="封面圖" class="col-span-1" />
      <form-tags-combobox
        v-model:tags="categoriesChoosed"
        title="分類"
        placeholder="請輸入分類"
        :tagList="['Vue', 'Nuxt3', 'SCSS']"
        class="col-span-2"
      />
      <form-fill-textarea v-model:value="summaryFill" title="摘要" placeholder="請輸入摘要" class="col-span-2" />
      <div class="col-span-2">
        <p class="pb-1 pr-4 text-lg">內容</p>
        <v-md-editor
          class="test"
          height="400px"
          v-model="contentFill"
          placeholder="使用 Markdown 語法，填寫你的內容..."
          :toolbar="toolbarCustom"
          :left-toolbar="toolbarConfig.leftToolbar"
          :right-toolbar="toolbarConfig.rightToolbar"
          :disabled-menus="['h/h1']"
        />
      </div>

      <!-- button -->
      <div class="col-span-2 ml-auto">
        <div class="relative flex w-36">
          <button
            @click.prevent="sendForm"
            class="c-rounded-button c-rounded-button-brown grow rounded-r-none rounded-l"
          >
            {{ currSubmitName }}
          </button>
          <div
            class="c-rounded-button c-rounded-button-brown cursor-pointer rounded-l-none rounded-r border-l border-solid border-white px-2"
            ref="container_el"
            @click="toggleList"
          >
            <i>
              <Icon v-if="isOpen" icon="material-symbols:arrow-drop-down" class="pointer-events-none inline-block" />
              <Icon v-else icon="material-symbols:arrow-drop-up" class="pointer-events-none inline-block" />
            </i>

            <ul
              v-if="isOpen"
              class="absolute left-0 bottom-[36px] w-full rounded border border-c-gray-100 bg-white py-2 shadow-lg"
            >
              <li
                v-for="item in submitList"
                :key="item.status"
                class="block w-full px-3 py-2 text-left text-lg text-c-gray-800 hover:opacity-50"
                @click="statusChoosed = item.status"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from '@/stores/index';

const $route = useRoute();
const $router = useRouter();
const $postStore = usePostStore();

const { toolbarConfig, toolbarCustom } = editorToolbar(); // 內容編輯工具列
const { isOpen, toggleList, setContainer } = useToggle();

const editId = computed(() => $route.params.id || '');

// 判斷是文章編輯還是文章編輯
if (editId.value) {
  const res = await $postStore.getCasePost(editId.value);

  !res.success && $router.push({ path: `/dashboard/posts-public` });
} else {
  $postStore.$reset();
}

// 標題
const titleFill = computed({
  get: () => $postStore.conditions.title,
  set: val => {
    $postStore.updateConditionsItem('title', val);
  }
});
// 分類
const categoriesChoosed = computed({
  get: () => $postStore.conditions.categories,
  set: val => {
    $postStore.updateConditionsItem('categories', val);
  }
});
// 摘要
const summaryFill = computed({
  get: () => $postStore.conditions.summary,
  set: val => {
    $postStore.updateConditionsItem('summary', val);
  }
});
// 內容
const contentFill = computed({
  get: () => $postStore.conditions.content,
  set: val => {
    $postStore.updateConditionsItem('content', val);
  }
});
//
const coverPictureChoosed = computed({
  get: () => $postStore.conditions.coverPicture,
  set: val => {
    $postStore.updateConditionsItem('coverPicture', val);
  }
});

// 按鈕選擇
const container_el = ref(null);
onMounted(() => {
  setContainer(container_el.value);
});

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
const currStatus = computed(() => $postStore.conditions.status);
const currSubmitName = computed(() => submitList.filter(item => item.status === currStatus.value)[0].name);

// 狀態
const statusChoosed = computed({
  get: () => $postStore.conditions.status,
  set: val => {
    $postStore.updateConditionsItem('status', val);
  }
});

// 送出表單
const sendForm = async () => {
  const res = await $postStore.updateCasePost();
  res.success && $router.push({ path: '/dashboard/post-edit-finish' });
};
</script>
