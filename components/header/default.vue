<template>
  <header ref="header_el" class="relative">
    <!-- header-bottom -->
    <div class="h-10">
      <div
        ref="headerBottom_el"
        class="w-full bg-white text-c-black-200"
        :class="{ 'an-slide-down fixed top-0 z-10 shadow': isShow }"
      >
        <div class="flex items-center px-6 py-1">
          <nuxt-link to="/" class="mr-10 w-48">
            <img src="/static/images/logo.svg" class="w-full" alt="Mandy's Note" />
          </nuxt-link>
          <nav class="font-bold">
            <nuxt-link
              v-for="item in menuList"
              :to="item.link"
              :key="item.link"
              class="relative mx-3 text-base hover:text-c-brown-200"
              :class="{
                'text-c-brown-200 after:absolute after:left-0 after:-bottom-6 after:inline-block after:h-1 after:w-full after:bg-c-brown-200 after:content-[attr(after)]':
                  currentPath === item.link
              }"
            >
              {{ item.name }}
            </nuxt-link>
          </nav>

          <nuxt-link class="ml-auto" to="/dashboard">後台</nuxt-link>
        </div>
      </div>
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

// 取得目前網址的路徑
const $route = useRoute();
const currentPath = ref('');
watchEffect(() => (currentPath.value = $route.path));

const updateEls = () => {
  $mainStore.els.header_el = header_el.value;
  $mainStore.els.headerBottom_el = headerBottom_el.value;
};

// 滾動後 fixed headerBottom
const header_el = ref(null);
const headerBottom_el = ref(null);
const isShow = ref(false);
const handleScrollShow = () => (isShow.value = window.scrollY > header_el.value.offsetHeight + 10);

onMounted(() => {
  updateEls();
  window.addEventListener('scroll', handleScrollShow);
});
onUnmounted(() => window.removeEventListener('scroll', handleScrollShow));
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
