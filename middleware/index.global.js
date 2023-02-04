import { useMainStore } from '@/stores/index';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const $mainStore = useMainStore();

  // 是否是後台頁面
  $mainStore.isDashboardPages = /^\/dashboard/g.test(to.path);
});
