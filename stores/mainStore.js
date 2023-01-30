import { defineStore } from 'pinia';

const defaultMemberInfo = {
  account: null,
  name: null,
  id: null
};
export default defineStore('mainStore', {
  state: () => ({
    isDashboardPages: false, // middleware - main.global 判定目前 path
    els: {},
    memberInfo: { ...defaultMemberInfo }
  }),
  getters: {
    isLogin: state => state.memberInfo.account !== null
  },
  actions: {
    async checkMemberStatus() {
      const $store = this;

      const res = await $fetch('/api/firebase/member/checkMemberState', {
        method: 'get'
      });
      if (res.status === 'success') {
        if ($store.memberInfo.id !== res.info.uid) {
          const obj = {
            account: res.info.email,
            name: res.info.name,
            id: res.info.uid
          };
          Object.assign($store.memberInfo, obj);
        }
      } else {
        Object.assign($store.memberInfo, defaultMemberInfo);
      }
    },
    async handleUserLogout() {
      const $store = this;

      const { data, error } = await useFetch('/api/firebase/member/sessionLogout', {
        method: 'post',
        initialCache: false
      });
      if (res.status === 'success') {
        return isDashboardPages ? navigateTo('/login') : navigateTo('/');
      } else {
        console.log(error.value.data.statusCode);
        throw createError({ statusCode: error.value.data.statusCode, statusMessage: error.value.data.message });
      }
    }
  }
});
