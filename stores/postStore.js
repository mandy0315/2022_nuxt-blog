import { defineStore } from 'pinia';
import firebaseAPIs from '@/utils/firebaseAPIs';
import useDateTime from '@/utils/useDateTime';

export default defineStore('postStore', {
  state: () => ({
    conditions: {
      id: '',
      title: '',
      summary: '',
      content: '',
      status: 'draft',
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

      return res;
    },
    async updateCasePost() {
      const $store = this;
      // 更新時間
      const { nowToISO, nowDataTime } = useDateTime();
      const time = nowToISO(nowDataTime);
      $store.conditions.update_time = time;

      // 新增還是更新資料
      const { addPostsAPI, updatePostsAPI } = firebaseAPIs();
      const res = $store.conditions.id
        ? await updatePostsAPI($store.conditions.id, $store.conditions)
        : await addPostsAPI($store.conditions);

      return res;
    },
    updateConditionsItem(item, val) {
      const $store = this;
      $store.conditions[item] = val;
    }
  }
});
