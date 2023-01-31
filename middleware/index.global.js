import { useMainStore } from '@/stores/index';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) {
    const $mainStore = useMainStore();

    // 是否是後台頁面
    $mainStore.isDashboardPages = /^\/dashboard/g.test(to.path);

    // 判斷會員
    const memberStatus = await $mainStore.checkMemberStatus();
    if (memberStatus === 'notsuccess' && $mainStore.isDashboardPages) {
      return navigateTo('/login');
    }
  }
});
