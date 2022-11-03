import { defineStore } from 'pinia';

export default defineStore('mainStore', {
  state: () => ({
    categorieList: []
  }),
  getters: {},
  actions: {
    async getCategoriesList() {
      const store = this;

      const { getCategoriesListAPI } = useFirebase();
      const data = await getCategoriesListAPI();
      store.categorieList = data.result;
    }
  }
});
