<template>
  <div>
    <template v-if="isSendFinish">
      <h1 class="mb-6 py-8 text-center text-2xl font-bold text-c-brown-200">送出成功！</h1>
      <nuxt-link to="/dashboard" class="c-btn c-btn-brown mx-auto block w-2/12 rounded text-center"
        >回到文章管理</nuxt-link
      >
    </template>
    <template v-else>
      <div class="my-4 grid grid-cols-2 gap-4 rounded bg-white px-6 pb-10 pt-6">
        <span>
          <form-fill-input v-model:value="titleFill" title="標題" placeholder="請輸入標題" class="col-span-1" />
          <p v-if="errors['title']" class="pt-1 text-sm text-red-600">{{ errors['title'] }}</p>
        </span>
        <form-tags-combobox
          v-model:tags="tagsChoosed"
          title="分類"
          placeholder="請輸入分類"
          :tagList="['Vue', 'Nuxt3', 'SCSS']"
          class="col-span-2"
        />
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
          <p v-if="errors['content']" class="pt-1 text-sm text-red-600">{{ errors['content'] }}</p>
        </div>

        <!-- button -->
        <div class="col-span-2 ml-auto">
          <div class="relative flex w-36">
            <button @click.prevent="sendForm" class="c-btn c-btn-brown grow rounded-r-none rounded-l">
              {{ currSubmitName }}
            </button>
            <div
              class="c-btn c-btn-brown cursor-pointer rounded-l-none rounded-r border-l border-solid border-white px-2"
              ref="container_el"
              @click="toggleList"
            >
              <i>
                <Icon v-if="isOpen" icon="material-symbols:arrow-drop-down" class="pointer-events-none inline-block" />
                <Icon v-else icon="material-symbols:arrow-drop-up" class="pointer-events-none inline-block" />
              </i>

              <ul
                v-if="isOpen"
                class="absolute left-0 bottom-[36px] w-full rounded border border-c-line-gray bg-white py-2 shadow-lg"
              >
                <li
                  v-for="item in submitList"
                  :key="item.status"
                  class="block w-full px-3 py-2 text-left text-lg text-c-black-200 hover:opacity-50"
                  @click="statusChoosed = item.status"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { usePostsStore } from '@/stores/index';

const $route = useRoute();
const $postsStore = usePostsStore();

const { toolbarConfig, toolbarCustom } = useEditorTool();
const { isOpen, toggleList, setContainer } = useToggle();

const editId = computed(() => $route.params.id || '');

// init
(async () => {
  // 判斷是文章編輯還是文章編輯
  $postsStore.$reset();
  if (editId.value) {
    const postsCase = await $postsStore.getPostsCase(editId.value);

    if (postsCase.status !== 'success') {
      showFailToast(postsCase.message);
      return navigateTo('/dashboard/post/manage-public');
    }
  }
})();

const { values, errors, checkError, checkAllError } = useFormVerify({
  initValues: {
    title: '',
    content: ''
  },
  validateRules: {
    title: [{ required: true, errorMsg: '必填請輸入標題' }],
    content: [{ required: true, errorMsg: '必填請輸入內容' }]
  }
});

const titleFill = computed({
  get: () => $postsStore.conditions.title,
  set: val => {
    values.title = val;
    checkError('title');
    $postsStore.updateCondition('title', val);
  }
});
const tagsChoosed = computed({
  get: () => $postsStore.conditions.tags,
  set: val => {
    $postsStore.updateCondition('tags', val);
  }
});
const contentFill = computed({
  get: () => $postsStore.conditions.content,
  set: val => {
    values.content = val;
    checkError('content');
    $postsStore.updateCondition('content', val);
  }
});
onMounted(() => {
  values.title = titleFill.value;
  values.content = contentFill.value;
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
const currStatus = computed(() => $postsStore.conditions.status);
const currSubmitName = computed(() => submitList.filter(item => item.status === currStatus.value)[0].name);

// 狀態
const statusChoosed = computed({
  get: () => $postsStore.conditions.status,
  set: val => {
    $postsStore.updateCondition('status', val);
  }
});

// 送出表單
const isSendFinish = ref(false);
const sendForm = async () => {
  const { isError } = checkAllError();
  if (isError) return false;

  const postsCase = await $postsStore.savePostsCase();
  if (postsCase.status === 'success') {
    isSendFinish.value = true;
  } else {
    showFailToast(postsCase.message);
  }
};
</script>
