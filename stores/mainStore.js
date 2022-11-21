import { defineStore } from 'pinia';

export default defineStore('mainStore', {
  state: () => ({
    title: 'hello pinia'
  }),
  getters: {},
  actions: {
    changeTitle() {
      console.log('yes');
      const store = this;
      store.title = 'test';
      console.log(store.title);
    }
  }
});
