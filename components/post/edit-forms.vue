<template>
  <div>
    <div class="my-4 grid grid-cols-2 gap-4 rounded bg-white px-6 pb-10 pt-6">
      <label class="col-span-2">
        <p class="pb-1 pr-4 text-lg">標題</p>
        <input
          v-model.lazy="fillTitle"
          type="text"
          class="form-input w-full rounded border-c-gray-400"
          placeholder="請輸入標題"
        />
      </label>
      <ui-form-combobox
        v-model:selectedTags="postInfo.categories"
        formTitle="分類"
        inputPlaceholder="請輸入分類"
        :tags="['Vue', 'Nuxt3', 'SCSS']"
        class="col-span-2"
      />
      <div class="col-span-2">
        <p class="pb-1 pr-4 text-lg">內容</p>
        <md-editor
          v-model="postInfo.content"
          code-theme="github"
          preview-theme="github"
          language="zh-tw"
          :toolbars="toolbars"
        />
      </div>
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
  </div>
</template>

<script setup>
const $route = useRoute();
const $router = useRouter();
const { isOpen, toggleList, setContainer } = useToggle();
const { addPostsAPI, getPostsAPI, updatePostsAPI } = useFirebase();
const { nowToISO } = useDateTime();

const postInfo = useState(() => ref({}));
const hasPostEditId = computed(() => !!$route.params.id);

// 判斷編輯還是新增文章
if (hasPostEditId.value) {
  postInfo.value.id = $route.params.id;

  const data = await getPostsAPI(postInfo.value.id);
  if (data.success) {
    postInfo.value = data.result;
  } else {
    $router.push({ path: `/dashboard/public` });
  }
} else {
  postInfo.value = {
    id: '',
    title: '',
    categories: [],
    content: '使用 Markdown 語法，填寫你的內容...',
    status: 'draft',
    update_time: nowToISO
  };
}

// 編輯器 md-editor-v3
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

// 標題填寫
const fillTitle = computed({
  get: () => postInfo.value.title,
  set: val => (postInfo.value.title = val)
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
const currSubmitName = computed(() => submitList.filter(item => item.status === postInfo.value.status)[0].name);
const selectSubmitStatus = computed({
  get: () => postInfo.value.status,
  set: val => (postInfo.value.status = val)
});
onMounted(() => {
  setContainer(container_el.value);
});

// 送出表單
const sendForm = async () => {
  postInfo.value['update_time'] = nowToISO;

  if (hasPostEditId.value) {
    const data = await updatePostsAPI(postInfo.value.id, postInfo.value);
    data.success && $router.push({ path: `/dashboard/post-edit/${data.id}` });
  } else {
    const data = await addPostsAPI(postInfo.value);
    data.success && $router.push({ path: `/dashboard/post-edit/${data.id}` });
  }
};
</script>

<style lang="scss" scoped></style>
