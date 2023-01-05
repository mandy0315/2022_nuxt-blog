import { defineStore } from 'pinia';

export default defineStore('mainStore', {
  state: () => ({
    isDashboardPages: false, // middleware - main.global 判定目前 path
    els: {}
  }),
  getters: {},
  actions: {}
});
