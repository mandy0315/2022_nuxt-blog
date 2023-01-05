import { defineStore } from 'pinia';

export default defineStore('mainStore', {
  state: () => ({
    webTitle: "Mandy's 筆記",
    isDashboardPages: false, // middleware - main.global 判定目前 path
    els: {}
  }),
  getters: {},
  actions: {}
});
