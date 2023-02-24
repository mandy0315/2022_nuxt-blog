<template>
  <header ref="headerRef">
    <!-- web -->
    <div
      class="flex w-full items-center bg-c-bg-light py-1 px-4 dark:bg-c-bg-dark"
      :class="{ 'an-slide-down fixed top-0 z-10 shadow': isFixHeader }"
    >
      <NuxtLink to="/" class="mr-10 w-40 overflow-hidden">
        <img src="/static/images/logo.svg" :alt="config.public.WEBSITE_TITLE" />
      </NuxtLink>
      <nav class="font-bold">
        <NuxtLink
          v-for="item in menuList['main']"
          :to="item.link"
          :key="item.link"
          class="relative mx-3 text-base hover:text-c-brown-200"
          :class="{
            'text-c-brown-200 after:absolute after:-bottom-4 after:left-0 after:inline-block after:h-1 after:w-full after:bg-c-brown-200 after:content-[attr(after)] ':
              currentPath === item.link
          }"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>

      <nav class="ju ml-auto flex items-center">
        <theColorMode class="mr-4" />
        <div
          ref="toggleRef"
          class="relative flex h-8 cursor-pointer items-center justify-center rounded-full border border-solid border-c-line-gray bg-white px-3 text-c-black-100 transition-all duration-300 ease-in-out dark:bg-c-black-200"
          @click="toggleList"
        >
          <Icon icon="fluent:calendar-settings-32-regular" class="text-2xl" />
          <i class="pointer-events-none align-middle text-base">
            <Icon v-if="isOpen" icon="material-symbols:keyboard-arrow-up" />
            <Icon v-else icon="material-symbols:keyboard-arrow-down" />
          </i>
          <div v-if="isOpen" class="absolute top-full right-0 mt-4">
            <theTooltip arrow="right">
              <p class="border-b border-c-line-gray px-2 py-1 text-c-black-200">後台管理</p>
              <div class="p-1">
                <NuxtLink
                  v-for="item in menuList['dashboard']"
                  :to="item.link"
                  :key="item.link"
                  class="block rounded-md p-1 text-center text-c-gray-200 hover:bg-c-gray-100/80 hover:text-c-black-200"
                  to="/dashboard/post/edit"
                  >{{ item.name }}</NuxtLink
                >
              </div>
            </theTooltip>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useMainStore } from '@/stores/index';

const menuList = {
  main: [
    {
      link: '/',
      name: '首頁'
    },
    {
      link: '/archive',
      name: '所有筆記'
    }
  ],
  dashboard: [
    {
      link: '/dashboard/post/manage-public',
      name: '筆記管理'
    },
    {
      link: '/dashboard/post/edit',
      name: '新增筆記'
    }
  ]
};

//

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

const { toggleList, isOpen, setContainer } = useToggle();
const toggleRef = ref(null);
onMounted(() => {
  setContainer(toggleRef.value);
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
