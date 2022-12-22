<template>
  <header>
    <header-top-nav />
    <div class="w-full bg-c-brown-800 text-white shadow">
      <div class="c-container flex items-center">
        <nuxt-link to="/" class="flex items-center">
          <div class="mr-2 inline-block h-10 w-10 align-middle">
            <img class="border-soild border-2 border-c-brown-800" src="/static/images/logo.svg" alt="logo" />
          </div>
          <span class="text-base">{{ webTitle }}</span>
        </nuxt-link>

        <header-search class="ml-auto mr-1" />
        <nav>
          <nuxt-link
            v-for="item in topBarNav"
            :to="item.link"
            :key="item.link"
            class="relative mx-2 text-base hover:text-c-yellow-200"
            :class="{ ' nav-link-lock text-c-yellow-200': currentPath === item.link }"
          >
            {{ item.name }}
          </nuxt-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useMainStore } from '@/stores/index';

const topBarNav = [
  {
    link: '/',
    name: '文章'
  },
  {
    link: '/archive',
    name: '檔案'
  },
  {
    link: '/about',
    name: '關於我'
  }
];

const $mainStore = useMainStore();
const webTitle = computed(() => $mainStore.webTitle);

const $route = useRoute();
const currentPath = ref('');

watchEffect(() => {
  currentPath.value = $route.path;
});
</script>

<style lang="scss" scoped>
.nav-link-lock {
  @apply after:absolute after:left-0 after:-bottom-3 after:inline-block after:h-1 after:w-full after:bg-c-yellow-200 after:content-[''];
}
</style>
