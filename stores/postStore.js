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
      categories: [],
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
        : await useFetch('/api/firebase/posts', {
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
const postSearchStore = defineStore('postSearchStore', {
  state: () => ({
    params: {
      publishState: '', // On: 發布 ; Off: 草稿
      sort: null, // 文章時間 0:desc ; 1:asc
      page: 1
    },
    postList: {
      articleList: [],
      pageInfo: {}
    }
  }),
  getters: {},
  actions: {
    getParamsObj(paramsObj) {
      const $store = this;

      const params = paramsObj ? { ...paramsObj } : { ...$store.params };
      params.page = $store.params.page;

      for (let key in params) {
        if (!params[key]) {
          delete params[key];
        }
      }

      return params;
    },
    async getPostList({ state = 'public', page = 1, sort = 0 }) {
      const api = {
        public: async () => {
          const { data } = await useFetch(`/api/firebase/posts/publicList?page=${page}&sort=${sort}`, {
            method: 'get',
            initialCache: false
          });
          return data.value;
        },
        draft: async () => {
          const { data } = await useFetch(`/api/firebase/posts/draftList?page=${page}`, {
            method: 'get',
            initialCache: false
          });
          return data.value;
        }
      };
      return await api[state]();
    },
    async getNewPostList(query) {
      const $store = this;

      $store.params.publishState = query.publishState; // 文章是否公開

      const { data } = await useFetch('/api/firebase/posts/caseList', {
        method: 'get',
        params: $store.getParamsObj(query),
        initialCache: false
      });
      if (data.value.success) {
        $store.postList.articleList = data.value.result?.articleList;
        $store.postList.pageInfo = data.value.result?.pageInfo;
      }
    },
    async setCurrentSort(sort) {
      const $store = this;
      $store.params.page = 1;
      $store.params.sort = +sort;

      await navigateTo({
        path: '/',
        query: $store.getParamsObj()
      });
    },
    async setCurrentPage(page) {
      const $store = this;
      $store.params.page = +page;

      await navigateTo({
        path: '/',
        query: $store.getParamsObj()
      });
    }
  }
});

export { postStore, postSearchStore };
