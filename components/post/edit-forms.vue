<template>
  <div>
    <div class="my-4 grid grid-cols-2 gap-4 rounded bg-white px-6 pb-10 pt-6">
      <form-fill-input v-model:value="postInfo.title" title="標題" placeholder="請輸入標題" class="col-span-2" />
      <form-tags-combobox
        v-model:tags="postInfo.categories"
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
          v-model="postInfo.content"
          placeholder="使用 Markdown 語法，填寫你的內容..."
          :disabled-menus="['h/h1']"
          :toolbar="$toolbarCustom"
          :left-toolbar="$toolbarConfig.leftToolbar"
          :right-toolbar="$toolbarConfig.rightToolbar"
          @upload-image="uploadImage"
          @copy-code-success="copyCode"
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

const { $toolbarConfig, toolbarCustom } = useNuxtApp();

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
    content: '',
    status: 'draft',
    update_time: nowToISO
  };
}

// v-md-editor 上傳圖片
const uploadImage = (event, insertImage, files) => {
  console.log(files);
};
const copyCode = code => {
  console.log(code);
};

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
    console.log(data.success);
  } else {
    const data = await addPostsAPI(postInfo.value);
    console.log(data.success);
  }
};
</script>

<style lang="scss" scoped></style>
