import { defineStore } from 'pinia';
import mainStore from './mainStore';
import useDateTime from '@/utils/useDateTime';

const postsStore = defineStore('postsStore', {
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
    async getPostsCase(id = '') {
      const $store = this;

      const { data } = await useFetch(`/api/firebase/posts/case/${id}`, {
        method: 'get',
        initialCache: false
      });
      data.value.success && Object.assign($store.conditions, data.value.result?.data);

      return data.value;
    },
    async savePostsCase() {
      const $store = this;
      // 更新時間
      const { nowToISO, nowDataTime } = useDateTime();
      const time = nowToISO(nowDataTime);
      $store.conditions.update_time = time;
      const id = $store.conditions.id;

      // 新增還是更新資料
      const { data } = id
        ? await useFetch(`/api/firebase/posts/case/${id}`, {
            method: 'put',
            body: $store.conditions,
            initialCache: false
          })
        : await useFetch('/api/firebase/posts/case', {
            method: 'post',
            body: $store.conditions,
            initialCache: false
          });

      return data.value;
    },
    async deletePostsCase(id = '') {
      const { data } = await useFetch(`/api/firebase/posts/case/${id}`, {
        method: 'delete',
        initialCache: false
      });
      return data.value;
    },
    updateCondition(item, val) {
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
const postsListStore = defineStore('postsListStore', {
  state: () => ({
    params: { ...defaultParams },
    postList: {
      articleList: [],
      pageInfo: {}
    }
  }),
  getters: {},
  actions: {
    updateURLParams() {
      const $store = this;
      const params = { ...$store.params };

      for (let key in params) {
        if (!params[key] || key === 'publishState') {
          delete params[key];
        }
      }

      return params;
    },
    setCurrentSort(sort) {
      const $store = this;
      const $route = useRoute();
      const { path } = $route;
      $store.params.page = 1;
      $store.params.sort = +sort;

      return navigateTo({
        path,
        query: $store.updateURLParams()
      });
    },
    setCurrentPage(page) {
      const $store = this;
      const $route = useRoute();
      const { path } = $route;
      $store.params.page = +page;

      return navigateTo({
        path,
        query: $store.updateURLParams()
      });
    },
    setCurrentSearch({ currentPath = '', currentSearch = '' }) {
      const $store = this;
      const $route = useRoute();
      const { path } = $route;
      $store.params.page = 1;
      $store.params.search = currentSearch;

      return navigateTo({
        path: currentPath ? currentPath : path,
        query: $store.updateURLParams()
      });
    },
    resetParams() {
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
    async getPostsList(queryStr) {
      const $store = this;

      $store.resetParams();

      const { data } = await useFetch('/api/firebase/posts/list', {
        method: 'get',
        params: $store.getParams(queryStr),
        initialCache: false
      });
      if (data.value.success) {
        $store.postList.articleList = data.value.result?.articleList;
        $store.postList.pageInfo = data.value.result?.pageInfo;
      }
    },
    async getMemberPostsList(queryStr) {
      const $store = this;
      const $mainStore = mainStore();

      $store.resetParams();

      const { data } = await useFetch(`/api/firebase/posts/${$mainStore.memberInfo.id}/list`, {
        method: 'get',
        params: $store.getParams(queryStr),
        initialCache: false
      });
      if (data.value.success) {
        $store.postList.articleList = data.value.result?.articleList;
        $store.postList.pageInfo = data.value.result?.pageInfo;
      }
    }
  }
});

export { postsStore, postsListStore };
