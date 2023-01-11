import { defineStore } from 'pinia';
const defaultMemberInfo = {
  email: null,
  name: null,
  uid: null
};
export default defineStore('mainStore', {
  state: () => ({
    isDashboardPages: false, // middleware - main.global 判定目前 path
    els: {},
    memberInfo: { ...defaultMemberInfo }
  }),
  getters: {
    isLogin: state => state.memberInfo.uid !== null
  },
  actions: {
    updateMemberInfo(item, val) {
      const $store = this;
      $store.memberInfo[item] = val;
    }
  }
});
