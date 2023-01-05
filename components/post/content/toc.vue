<template>
  <div v-if="tocList.length !== 0" :class="{ 'fixed top-20': isScrollFixed }">
    <p class="pb-1 text-sm text-c-gray-400">文章索引</p>
    <div v-if="tocList.length > 0" class="px-2">
      <div
        v-for="anchor in tocList"
        :key="anchor.title"
        class="py-0.5"
        :class="{ 'text-c-brown-600': currentSection === anchor.title }"
        :style="{ 'padding-left': `${anchor.indent * 10}px` }"
        @click="currentSection = anchor.title"
      >
        <a :href="`#${anchor.id}`" class="cursor-pointer">{{ anchor.title }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/index';

// 取得目錄列表
const mdPreview_el = useState('mdPreview_el');
const tocList = useState('tocList', () => []);
const getTocList = () => {
  tocList.value = [];
  let data = [];

  const anchors = mdPreview_el.value.$el.querySelectorAll('h2,h3,h4,h5,h6');
  let anchorsToArr = [...anchors].filter(anchor => !!anchor.innerText.trim());
  if (anchorsToArr.length === 0) {
    return false;
  }

  const hTags = [...new Set(anchorsToArr.map(anchor => anchor.tagName).sort())];

  data = anchorsToArr.map(anchor => ({
    id: anchor.id,
    title: anchor.innerText,
    indent: hTags.indexOf(anchor.tagName)
  }));
  tocList.value = data;
};

// 目錄滾動固定
const $mainStore = useMainStore();
const isScrollFixed = useState('isScrollFixed', () => false);
const headerHeight = computed(() => $mainStore.els.header_el.offsetHeight);
const setTocFixed = () => (isScrollFixed.value = window.scrollY > headerHeight.value + 10);

// 偵測目前段落
const currentSection = useState('currentSection', () => '');
const setCurrentSection = () => {
  const scrollTop = window.scrollY;
  tocList.value.forEach(anchor => {
    const hTagHeight = mdPreview_el.value.$el.querySelector(`#${anchor.id}`).offsetTop;
    if (scrollTop >= hTagHeight - headerHeight.value) {
      currentSection.value = anchor.title;
    }
  });
};

const handleScroll = () => {
  setTocFixed();
  setCurrentSection();
};

onMounted(() => {
  getTocList();
  currentSection.value = !currentSection.value && tocList.value[0]?.title;
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
