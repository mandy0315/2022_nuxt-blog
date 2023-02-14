<template>
  <nav class="relative pl-14" :class="hiddenToc ? 'w-0' : 'w-60'">
    <div :class="isScrollFixed ? 'fixed top-16' : 'absolute top-0'">
      <button @click="hiddenToc = !hiddenToc" class="absolute right-full border p-2 text-lg">
        <Icon v-if="hiddenToc" icon="material-symbols:keyboard-double-arrow-left-rounded" />
        <Icon v-else icon="material-symbols:keyboard-double-arrow-right-rounded" />
      </button>
      <div v-if="!hiddenToc" class="px-4 py-2">
        <p class="pb-1 text-sm text-c-gray-200">目錄</p>
        <template v-if="tocList.length > 0">
          <div
            v-for="anchor in tocList"
            :key="anchor.title"
            class="py-0.5"
            :class="{ 'text-c-brown-200': currentSection === anchor.title }"
            :style="{ 'padding-left': `${anchor.indent * 10}px` }"
            @click="currentSection = anchor.title"
          >
            <a :href="`#${anchor.id}`" class="cursor-pointer">{{ anchor.title }}</a>
          </div>
        </template>
        <div v-else>目前沒有目錄</div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useMainStore } from '@/stores/index';

const $mainStore = useMainStore();
const $route = useRoute();
const { scrollToSection } = useScrollTo();
const mdPreview_el = useState('mdPreview_el');

const currentSection = ref('');

const headerBottomHeight = computed(() => $mainStore.els.headerBottom_el?.offsetHeight || 0);

// 目錄展開縮小
const hiddenToc = ref(false);
watch(hiddenToc, isHidden => {
  if (isHidden) {
    localStorage.setItem('hiddenToc', true);
  } else {
    localStorage.removeItem('hiddenToc');
  }
});

const tocList = ref([]);
const getTocList = () => {
  let tocList = [];

  const anchors = mdPreview_el.value.$el.querySelectorAll('h2,h3,h4,h5,h6');
  let anchorsToArr = [...anchors].filter(anchor => !!anchor.innerText.trim());
  if (anchorsToArr.length === 0) {
    return false;
  }

  const hTags = [...new Set(anchorsToArr.map(anchor => anchor.tagName).sort())];

  tocList = anchorsToArr.map(anchor => ({
    id: anchor.id,
    title: anchor.innerText,
    indent: hTags.indexOf(anchor.tagName)
  }));
  return tocList;
};

// css 設定 scroll-padding-top
const setScrollPaddingStyle = () => {
  document.querySelectorAll('html,body').forEach(el => {
    el.style.cssText = `scroll-padding-top: ${headerBottomHeight.value + 10}px;`;
  });
};

// 網址有錨點滾到區塊
const URLHashScrollToSection = () => {
  const { hash } = $route;

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
};

// 監聽滾動事件
const isScrollFixed = ref(false);
const setTocFixed = () => {
  const topToMdPreviewHeight = mdPreview_el.value.$el.offsetTop;
  isScrollFixed.value = window.scrollY > topToMdPreviewHeight - headerBottomHeight.value;
};
const setCurrentSection = () => {
  for (const anchor of tocList.value) {
    const hTag_el = mdPreview_el.value.$el.querySelector(`#${anchor.id}`);
    if (hTag_el.getBoundingClientRect().y <= headerBottomHeight.value + 20) {
      currentSection.value = anchor.title;
    }
  }
};
const handleScroll = () => {
  setTocFixed();
  setCurrentSection();
};

onMounted(() => {
  hiddenToc.value = !!localStorage.getItem('hiddenToc');
  const data = getTocList();
  if (data) {
    tocList.value = data;
    currentSection.value = tocList.value[0].title;

    setScrollPaddingStyle();
    URLHashScrollToSection();

    window.addEventListener('scroll', handleScroll);
  }
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
