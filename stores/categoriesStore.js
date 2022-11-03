import { defineStore } from 'pinia';

export default defineStore('mainStore', {
  state: () => ({
    categorieList: []
  }),
  getters: {},
  actions: {
    async getCategoriesList() {
      const store = this;

      const { getCategoriesAPI } = useFirebase();
      const data = await getCategoriesAPI();
      store.categorieList = data.result;
    }
  }
});
