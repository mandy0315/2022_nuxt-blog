export default function () {
  // 分類
  const getCategoriesListAPI = async () => {
    const { data } = await useFetch('/api/firebase/categories/list', {
      method: 'get',
      initialCache: false
    });
    return data.value;
  };
  // 文章
  const getPostsPublicListAPI = async page => {
    const { data } = await useFetch(`/api/firebase/posts/publicList?page=${page}`, {
      method: 'get',
      initialCache: false
    });
    return data.value;
  };
  const getPostsDraftListAPI = async page => {
    const { data } = await useFetch(`/api/firebase/posts/draftList?page=${page}`, {
      method: 'get',
      initialCache: false
    });
    return data.value;
  };
  const addPostsAPI = async doc => {
    const { data } = await useFetch('/api/firebase/posts', {
      method: 'post',
      body: doc,
      initialCache: false
    });
    return data.value;
  };
  const getPostsAPI = async id => {
    const { data } = await useFetch(`/api/firebase/posts/${id}`, {
      method: 'get',
      initialCache: false
    });
    return data.value;
  };
  const updatePostsAPI = async (id, doc) => {
    const { data } = await useFetch(`/api/firebase/posts/${id}`, {
      method: 'put',
      body: doc,
      initialCache: false
    });
    return data.value;
  };
  const deletePostsAPI = async id => {
    const { data } = await useFetch(`/api/firebase/posts/${id}`, {
      method: 'delete',
      initialCache: false
    });
    return data.value;
  };

  return {
    getCategoriesListAPI,
    getPostsPublicListAPI,
    getPostsDraftListAPI,
    getPostsAPI,
    addPostsAPI,
    deletePostsAPI,
    updatePostsAPI
  };
}
