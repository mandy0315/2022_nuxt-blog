import { useMainStore } from '@/stores/index';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const $mainStore = useMainStore();

  $mainStore.isDashboardPages = /^\/dashboard/g.test(to.path); // 是否是後台頁面

  await $mainStore.checkMemberStatus();
});
