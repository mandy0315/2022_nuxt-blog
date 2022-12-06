import { defineStore } from 'pinia';
import firebaseAPIs from '@/utils/firebaseAPIs.js';

export default defineStore('postStore', {
  state: () => ({
    conditions: {
      id: '',
      status: '',
      title: '',
      content: '',
      status: '',
      categories: [],
      update_time: ''
    },
    postList: []
  }),
  getters: {},
  actions: {
    async getPostList(state = 'public') {
      const $store = this;
      const { getPostsPublicListAPI, getPostsDraftListAPI } = firebaseAPIs();
      const api = {
        public: async () => {
          const data = await getPostsPublicListAPI();
          return data.result;
        },
        draft: async () => {
          const data = await getPostsDraftListAPI();
          return data.result;
        }
      };

      const res = await api[state]();
      $store.postList = res;
    },
    async getCasePost(id = '') {
      const $store = this;
      const { getPostsAPI } = firebaseAPIs();

      const res = await getPostsAPI(id);
      res.success && Object.assign($store.conditions, res.result);
    }
  }
});
