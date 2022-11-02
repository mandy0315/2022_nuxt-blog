import { defineStore } from 'pinia';

export default defineStore('mainStore', {
  state: () => ({
    categorieList: []
  }),
  getters: {},
  actions: {
    async updateCategorieList() {
      const store = this;

      const { getFirebaseData } = useFirebase();

      const data = await getFirebaseData('categories');
      store.categorieList = data.result;
    }
  }
});
