import { useMainStore } from '@/stores/index';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const $mainStore = useMainStore();

  // 判斷會員
  const memberStatus = await $mainStore.checkMemberStatus();
  if (memberStatus === 'notsuccess') {
    return navigateTo('/login');
  }
});
