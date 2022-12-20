import { defineStore } from 'pinia';

export default defineStore('mainStore', {
  state: () => ({
    webTitle: 'Mandy 生活&技術筆記',
    isDashboardPages: false // middleware - main.global 判定目前 path
  }),
  getters: {},
  actions: {}
});
