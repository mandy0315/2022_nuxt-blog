<template>
  <nav v-if="tocList.length !== 0" class="relative pl-14" :class="hiddenToc ? 'w-0' : 'w-60'">
    <div :class="isScrollFixed ? 'fixed top-16' : 'absolute top-0'">
      <button @click="hiddenToc = !hiddenToc" class="absolute right-full border p-2 text-lg">
        <Icon v-if="hiddenToc" icon="material-symbols:keyboard-double-arrow-left-rounded" />
        <Icon v-else icon="material-symbols:keyboard-double-arrow-right-rounded" />
      </button>
      <div v-if="!hiddenToc" class="px-4 py-2">
        <p class="pb-1 text-sm text-c-gray-400">目錄</p>
        <div v-if="tocList.length > 0" class="">
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

const hiddenToc = ref(false);
watch(hiddenToc, isHidden => {
  if (isHidden) {
    localStorage.setItem('hiddenToc', true);
  } else {
    localStorage.removeItem('hiddenToc');
  }
});

const headerBottomHeight = computed(() => $mainStore.els.headerBottom_el?.offsetHeight || 0);

const tocList = ref([]);
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

const isScrollFixed = ref(false);
const setTocFixed = () => {
  const topToMdPreviewHeight = mdPreview_el.value.$el.offsetTop;
  isScrollFixed.value = window.scrollY > topToMdPreviewHeight - headerBottomHeight.value;
};

const setScrollPaddingStyle = () => {
  document.querySelectorAll('html,body').forEach(el => {
    el.style.cssText = `scroll-padding-top: ${headerBottomHeight.value + 10}px;`;
  });
};

// 偵測目前段落
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
  getTocList();
  setScrollPaddingStyle();
  URLHashScrollToSection();
  currentSection.value = tocList.value[0].title;
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
