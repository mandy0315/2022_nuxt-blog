import { defineStore } from 'pinia';
import mainStore from './mainStore';
import useDateTime from '@/utils/useDateTime';
import { showFailToast } from 'vant';

const postsStore = defineStore('postsStore', {
  state: () => ({
    conditions: {
      id: '',
      member_id: '',
      title: '',
      content: '',
      status: 'draft',
      tags: [],
      coverPicture: [],
      created_at: '',
      update_time: ''
    }
  }),
  getters: {},
  actions: {
    async getPostsCase(id = '') {
      const $store = this;
      let postsCase = {
        status: '',
        conditions: {}
      };

      const { data, error } = await useFetch(`/api/firebase/post/case/${id}`, {
        method: 'get',
        initialCache: false
      });

      const conditionsOfCase = data.value?.data?.conditions;
      const isHasConditions = Object.keys(conditionsOfCase).length > 0;

      if (data.value?.status === 'success' && isHasConditions) {
        postsCase.status = 'success';
        postsCase.conditions = conditionsOfCase;

        Object.assign($store.conditions, conditionsOfCase);
      } else if (data.value?.status === 'success' && !isHasConditions) {
        postsCase.status = 'notconditions';
        postsCase.message = '文章沒有資料';
      } else {
        console.log(error.value?.data);
        postsCase.status = 'notsuccess';
        postsCase.message = error.value?.data?.message;
      }

      return postsCase;
    },
    async savePostsCase() {
      const $store = this;
      const $mainStore = mainStore();

      // 更新時間
      const id = $store.conditions.id;
      const { nowToISO, nowDataTime } = useDateTime();
      const time = nowToISO(nowDataTime);
      if (!id) {
        // 建立文章時間
        $store.conditions.created_at = time;
      }
      $store.conditions.update_time = time;

      // 新增會員id
      const memberId = $mainStore.memberInfo.id;
      $store.conditions.member_id = memberId;

      // 新增還是更新資料
      const { data, error } = id
        ? await useFetch(`/api/firebase/post/case/${id}`, {
            method: 'put',
            body: $store.conditions,
            initialCache: false
          })
        : await useFetch('/api/firebase/post/case', {
            method: 'post',
            body: $store.conditions,
            initialCache: false
          });
      return error.value ? error.value.data : data.value;
    },
    async deletePostsCase(id = '') {
      const { data } = await useFetch(`/api/firebase/post/case/${id}`, {
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
      list: [],
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
      const $mainStore = mainStore();

      $store.resetParams();

      const fetchURL = $mainStore.isDashboardPages
        ? `/api/firebase/post/${$mainStore.memberInfo.id}/list`
        : '/api/firebase/post/list';
      const { data, error } = await useFetch(fetchURL, {
        method: 'get',
        params: $store.getParams(queryStr),
        initialCache: false
      });
      if (data.value?.status === 'success') {
        $store.postList.list = data.value.data?.list;
        $store.postList.pageInfo = data.value.data?.pageInfo;
      } else {
        console.log(error.value?.data);
        showFailToast(error.value?.data?.statusMessage);
      }
    }
  }
});

export { postsStore, postsListStore };
