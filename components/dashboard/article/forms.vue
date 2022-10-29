<template>
  <div>
    <form>
      <section class="my-4 grid grid-cols-2 gap-4 rounded bg-white px-6 pb-10 pt-6">
        <label class="pb-4">
          <p class="pb-1 pr-4 text-lg">標題</p>
          <input type="text" class="form-input w-full rounded border-c-gray-400" placeholder="請輸入標題" />
        </label>

        <label class="inline-block pb-4">
          <p class="pb-1 pr-4 text-lg">分類</p>
          <select class="form-select w-full rounded border-c-gray-400">
            <option value="美國">Nuxt</option>
          </select>
        </label>
        <md-editor
          class="col-span-2"
          v-model="content"
          code-theme="github"
          preview-theme="github"
          language="zh-tw"
          :toolbars="toolbars"
          @onUploadImg="onUploadImg"
        ></md-editor>
      </section>
      <div class="text-right">
        <div class="relative inline-block">
          <button
            class="c-rounded-button rounded-r-none rounded-l"
            :class="typeSubmit === '刪除文章' ? 'c-rounded-button-red' : 'c-rounded-button-gray'"
          >
            {{ typeSubmit }}
          </button>
          <div
            ref="container_el"
            @click="toggleList"
            class="c-rounded-button rounded-l-none rounded-r border-l border-solid border-c-gray-400/50 px-2"
            :class="typeSubmit === '刪除文章' ? 'c-rounded-button-red' : 'c-rounded-button-gray'"
          >
            <Icon v-if="isOpen" icon="material-symbols:arrow-drop-down" class="inline-block" />
            <Icon v-else icon="material-symbols:arrow-drop-up" class="inline-block" />

            <div
              v-if="isOpen"
              class="absolute left-0 bottom-[36px] w-full rounded border border-c-gray-400 bg-white p-2 text-center shadow-lg"
            >
              <template v-for="item in submitList" :key="item.name">
                <button
                  v-if="item.isShow"
                  class="block w-full py-1 hover:opacity-50"
                  :class="item.name === '刪除文章' ? 'text-red-700' : 'text-c-gray-800'"
                  @click.prevent="selectTypeSubmit = item.name"
                >
                  {{ item.name }}
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
const route = useRoute();
const { isOpen, toggleList, setContainer } = useToggle();

// 按鈕選擇
const container_el = ref(null);
const typeSubmit = ref('儲存草稿');
const submitList = [
  {
    name: '儲存草稿',
    isShow: true
  },
  {
    name: '公開文章',
    isShow: true
  },
  {
    name: '刪除文章',
    isShow: route.path !== '/dashboard/article/create'
  }
];
const selectTypeSubmit = computed({
  get: () => typeSubmit.value,
  set: val => {
    typeSubmit.value = val;
  }
});
onMounted(() => {
  setContainer(container_el.value);
});

// md-editor-v3
const content = ref('# Hello Editor!');
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

// const onUploadImg = async (files, callback) => {
//   console.log(files);
//   const form = new FormData();
//   form.append('file', files);
//   // console.log();
//   await useFetch('/api/updateImages', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     },
//     body: form
//   });

// };
</script>

<style lang="scss" scoped></style>
