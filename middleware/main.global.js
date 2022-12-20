import { useMainStore } from '@/stores/index';

export default defineNuxtRouteMiddleware((to, from) => {
  const $mainStore = useMainStore();

  $mainStore.isDashboardPages = /^\/dashboard/g.test(to.path); // 是否是後台頁面
});
