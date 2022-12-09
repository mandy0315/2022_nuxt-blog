import { useMainStore } from '@/stores/index';

export default defineNuxtRouteMiddleware((to, from) => {
  // 是否是後台頁面
  const $mainStore = useMainStore();
  $mainStore.isDashboardPages = /^\/dashboard/g.test(to.path);
});
