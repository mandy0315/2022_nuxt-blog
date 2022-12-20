import { defineStore } from 'pinia';
import useDateTime from '@/utils/useDateTime';

export default defineStore('postStore', {
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
    },
    postList: []
  }),
  getters: {},
  actions: {
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
