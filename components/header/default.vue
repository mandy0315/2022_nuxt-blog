<template>
  <header ref="headerRef">
    <!-- web -->
    <div
      class="flex w-full items-center bg-c-bg-light py-2 px-4 text-c-black-200"
      :class="{ 'an-slide-down fixed top-0 z-10 shadow': isFixHeader }"
    >
      <nuxt-link to="/" class="mr-10 w-40 overflow-hidden">
        <img src="/static/images/logo.svg" :alt="config.public.WEBSITE_TITLE" />
      </nuxt-link>
      <nav class="font-bold">
        <nuxt-link
          v-for="item in menuList"
          :to="item.link"
          :key="item.link"
          class="relative mx-3 text-base hover:text-c-brown-200"
          :class="{
            'text-c-brown-200 after:absolute after:left-0 after:-bottom-4 after:inline-block after:h-1 after:w-full after:bg-c-brown-200 after:content-[attr(after)]':
              currentPath === item.link
          }"
        >
          {{ item.name }}
        </nuxt-link>
      </nav>

      <nav class="ju ml-auto flex items-center">
        <theColorMode v-model:isDarkMode="isDarkMode" class="mr-4" />
        <nuxt-link to="/dashboard">後台</nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useMainStore } from '@/stores/index';

const menuList = [
  {
    link: '/',
    name: '首頁'
  },
  {
    link: '/archive',
    name: '筆記列表'
  }
];

const $mainStore = useMainStore();
const config = useRuntimeConfig();
const $route = useRoute();

const currentPath = computed(() => $route.path);
const headerRef = ref(null);

const isFixHeader = ref(false);
const handleScrollShow = () => (isFixHeader.value = window.scrollY > headerRef.value.offsetHeight + 10);

onMounted(() => {
  $mainStore.updateHeaderHeigth(headerRef.value.offsetHeight);
  window.addEventListener('scroll', handleScrollShow);
});
onUnmounted(() => window.removeEventListener('scroll', handleScrollShow));

const isDarkMode = computed({
  get: () => $mainStore.isDarkMode,
  set: val => {
    $mainStore.isDarkMode = val;
  }
});
</script>

<style lang="scss" scoped>
.an-slide-down {
  animation: slide-down 400ms linear 1 both;
}
@keyframes slide-down {
  from {
    @apply -top-1/4;
  }
  to {
    @apply top-0;
  }
}
</style>
