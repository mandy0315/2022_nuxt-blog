import { useMainStore } from '@/stores/index';
export default defineNuxtRouteMiddleware(async (to, from) => {
  const $mainStore = useMainStore();
  if (!$mainStore.isLogin) {
    return navigateTo('/login');
  }
});
