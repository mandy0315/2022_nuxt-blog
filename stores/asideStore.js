import { defineStore } from 'pinia';

export default defineStore('asideStore', {
  state: () => ({
    tagList: [],
    postList: []
  }),
  getters: {},
  actions: {
    async getData(listName) {
      const fetchURLs = {
        tagList: '/api/firebase/tag/list',
        postList: '/api/firebase/post/newPostlist'
      };
      const { data, error } = await useFetch(fetchURLs[listName], {
        method: 'get',
        initialCache: false
      });
      if (data.value?.status === 'success') {
        return data.value?.data?.list;
      } else {
        console.log(error.value?.data?.message);
      }
    },

    async updateAllList() {
      const $store = this;
      const [_tagList, _postsList] = await Promise.all([$store.getData('tagList'), $store.getData('postList')]);
      $store.tagList = _tagList;
      $store.postList = _postsList;
    }
  }
});
