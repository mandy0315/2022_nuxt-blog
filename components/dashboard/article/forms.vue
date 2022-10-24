<template>
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

      <client-only>
        <md-editor v-model="content" preview-theme="github" class="col-span-2" />
      </client-only>
    </section>
    <div class="text-right">
      <div class="relative inline-block">
        <button
          class="c-rounded-button rounded-r-none rounded-l"
          :class="submit === '刪除文章' ? 'c-rounded-button-red' : 'c-rounded-button-gray'"
        >
          {{ submit }}
        </button>
        <button
          class="c-rounded-button rounded-l-none rounded-r border-l border-solid border-c-gray-400/50 px-2"
          :class="submit === '刪除文章' ? 'c-rounded-button-red' : 'c-rounded-button-gray'"
          @click.prevent="isOpenSelectSubmit = !isOpenSelectSubmit"
        >
          <Icon v-if="isOpenSelectSubmit" name="material-symbols:arrow-drop-down" />
          <Icon v-else name="material-symbols:arrow-drop-up" />
        </button>
        <div
          v-if="isOpenSelectSubmit"
          class="absolute bottom-[36px] w-full rounded border border-c-gray-400 bg-white p-2 text-center shadow-lg"
        >
          <template v-for="item in submitList" :key="item.name">
            <button
              v-if="item.isShow"
              class="block w-full py-1 hover:opacity-50"
              :class="item.name === '刪除文章' ? 'text-red-700' : 'text-c-gray-800'"
              @click.prevent="selectSubmit = item.name"
            >
              {{ item.name }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import mdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const route = useRoute();

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
const content = useState(() => '# Hello Editor!');
const isOpenSelectSubmit = useState(() => false);

const submit = useState(() => '儲存草稿');
const selectSubmit = computed({
  get: () => submit.value,
  set: val => {
    submit.value = val;
    isOpenSelectSubmit.value = false;
  }
});
</script>

<style lang="scss" scoped></style>
