import { defineStore } from 'pinia';
import useDateTime from '@/utils/useDateTime';

const postStore = defineStore('postStore', {
  state: () => ({
    conditions: {
      id: '',
      title: '',
      summary: '',
      coverPicture: [],
      content: '',
      status: 'draft',
      tags: [],
      update_time: ''
    }
  }),
  getters: {},
  actions: {
    async getCasePost(id = '') {
      const $store = this;

      const { data } = await useFetch(`/api/firebase/posts/${id}`, {
        method: 'get',
        initialCache: false
      });
      data.value.success && Object.assign($store.conditions, data.value.result);

      return data.value;
    },
    async updateCasePost() {
      const $store = this;
      // 更新時間
      const { nowToISO, nowDataTime } = useDateTime();
      const time = nowToISO(nowDataTime);
      $store.conditions.update_time = time;
      const id = $store.conditions.id;

      // 新增還是更新資料
      const { data } = id
        ? await useFetch(`/api/firebase/posts/${id}`, {
            method: 'put',
            body: $store.conditions,
            initialCache: false
          })
        : await useFetch('/api/firebase/posts/addCase', {
            method: 'post',
            body: $store.conditions,
            initialCache: false
          });

      return data.value;
    },
    async deleteCasePost(id = '') {
      const { data } = await useFetch(`/api/firebase/posts/${id}`, {
        method: 'delete',
        initialCache: false
      });
      return data.value;
    },

    updateConditionsItem(item, val) {
      const $store = this;
      $store.conditions[item] = val;
    }
  }
});

const defaultParams = {
  publishState: 'On', // On: 發布 ; Off: 沒發佈-草稿
  search: '',
  sort: null, // 文章時間 0:desc ; 1:asc
  page: 1
};
const postSearchStore = defineStore('postSearchStore', {
  state: () => ({
    params: { ...defaultParams },
    postList: {
      articleList: [],
      pageInfo: {}
    }
  }),
  getters: {},
  actions: {
    resetStateParams() {
      const $store = this;
      Object.assign($store.params, defaultParams);
    },
    getParams(queryStr) {
      const $store = this;
      Object.assign($store.params, queryStr);
      const params = { ...$store.params };

      for (let key in params) {
        if (!params[key]) {
          delete params[key];
        }
      }
      return params;
    },
    getURLParams() {
      const $store = this;
      const params = { ...$store.params };

      for (let key in params) {
        if (!params[key] || key === 'publishState') {
          delete params[key];
        }
      }

      return params;
    },
    async getPostList(queryStr) {
      const $store = this;

      $store.resetStateParams();

      const { data } = await useFetch('/api/firebase/posts/caseList', {
        method: 'get',
        params: $store.getParams(queryStr),
        initialCache: false
      });
      if (data.value.success) {
        $store.postList.articleList = data.value.result?.articleList;
        $store.postList.pageInfo = data.value.result?.pageInfo;
      }
    },
    setCurrentSort(sort) {
      const $store = this;
      const $route = useRoute();
      const { path } = $route;
      $store.params.page = 1;
      $store.params.sort = +sort;

      navigateTo({
        path,
        query: $store.getURLParams()
      });
    },
    setCurrentPage(page) {
      const $store = this;
      const $route = useRoute();
      const { path } = $route;
      $store.params.page = +page;

      navigateTo({
        path,
        query: $store.getURLParams()
      });
    },
    setCurrentSearch({ currentPath = '', currentSearch = '' }) {
      const $store = this;
      const $route = useRoute();
      const { path } = $route;
      $store.params.page = 1;
      $store.params.search = currentSearch;

      navigateTo({
        path: currentPath ? currentPath : path,
        query: $store.getURLParams()
      });
    }
  }
});

export { postStore, postSearchStore };
