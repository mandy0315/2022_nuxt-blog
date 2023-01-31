import { defineStore } from 'pinia';

const defaultMemberInfo = {
  account: null,
  name: null,
  id: null,
  photoURL: null
};
export default defineStore('mainStore', {
  state: () => ({
    isDashboardPages: false, // middleware - main.global 判定目前 path
    els: {},
    memberInfo: { ...defaultMemberInfo }
  }),
  getters: {
    isLogin: state => !!state.memberInfo.account
  },
  actions: {
    async checkMemberStatus() {
      const $store = this;
      const accessToken = useCookie('access_token');

      const res = await $fetch('/api/firebase/member/checkMemberState', {
        method: 'post',
        body: { accessToken: accessToken.value }
      });
      if (res.status === 'success') {
        if ($store.memberInfo.id !== res.info.uid) {
          const obj = {
            account: res.info.email,
            name: res.info.name,
            id: res.info.uid,
            photoURL: res.info.picture
          };
          Object.assign($store.memberInfo, obj);
        }
        return res.status;
      } else {
        Object.assign($store.memberInfo, defaultMemberInfo);
        return res.status;
      }
    },
    async handleUserLogout() {
      const $store = this;

      const { data } = await useFetch('/api/firebase/member/sessionLogout', {
        method: 'post',
        initialCache: false
      });
      if (data.value.status === 'success') {
        if ($store.isDashboardPages) {
          navigateTo('/login');
        } else {
          await $store.checkMemberStatus();
        }
      }
    }
  }
});
