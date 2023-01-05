<template>
  <div class="flex">
    <article ref="postContent_el" class="mr-4 grow">
      <h1 :id="`#${title}`" class="c-title pb-3">{{ title }}</h1>
      <div class="mr-2 flex items-center">
        <div class="inline-block self-center text-sm text-c-gray-400">
          <Icon icon="ic:baseline-date-range" class="mr-1 inline-block text-base" />
          <span class="align-middle">
            {{ dateFormat(update_time) }}
          </span>
        </div>
        <div
          v-if="tags.length > 0"
          class="pl-3 before:mr-2 before:inline-block before:h-5 before:w-[1px] before:bg-c-gray-400 before:align-middle before:content-['']"
        >
          <span v-for="item in tags" :key="item">
            <the-tag :name="item" :hasLinks="hasTagLinks" class="inline-block" />
          </span>
        </div>
      </div>
      <!-- image -->
      <div v-if="coverPicture.length > 0" class="block max-w-xl py-4">
        <post-image :link="coverPicture[0].link" :title="coverPicture[0].name" />
      </div>
      <!-- content -->
      <div class="pt-8">
        <v-md-preview ref="mdPreview_el" class="preview-custom" :text="content" />
        <client-only>
          <post-content-comment :postTitle="title" />
        </client-only>
      </div>
    </article>
    <aside v-if="hasToc" class="w-60">
      <post-content-toc />
    </aside>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/index';

const props = defineProps({
  title: {
    type: String,
    default: '標題'
  },
  tags: {
    type: Array,
    default: () => []
  },
  coverPicture: {
    type: Array,
    default: () => []
  },
  content: {
    type: String,
    default: '輸入內容'
  },
  update_time: {
    type: String,
    default: '2022/11/04'
  },
  hasTagLinks: {
    type: Boolean,
    default: false
  },
  hasToc: {
    type: Boolean,
    default: false
  }
});

const { dateFormat } = useDateTime();

const mdPreview_el = useState('mdPreview_el', () => ref(null));

const $mainStore = useMainStore();
const headerBottomHeight = computed(() => $mainStore.els.headerBottom_el?.offsetHeight || 0);

// 設定滑動後樣式
const setScrollMarginStyle = () => {
  document.querySelectorAll('html,body').forEach(el => {
    el.style.cssText = `scroll-padding-top: ${headerBottomHeight.value + 10}px;`;
  });
};

onMounted(() => {
  setScrollMarginStyle();
  // 錨點滑動
  const $route = useRoute();
  const { hash } = $route;
  const { scrollToSection } = useScroll();
  if (hash) {
    const str = hash.replace('#', '');
    const target = document.getElementById(str);

    window.setTimeout(() => {
      target &&
        scrollToSection({
          toSection: target,
          marginTop: headerBottomHeight.value + 10
        });
    }, 500);
  }
});
</script>
