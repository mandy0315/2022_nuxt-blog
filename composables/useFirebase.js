export default function () {
  // 分類
  const getCategoriesListAPI = async () => {
    const { data } = await useFetch('/api/firebase/categories/list', {
      method: 'get',
      initialCache: false
    });
    return data.value;
  };
  const addCategoriesAPI = async doc => {
    const { data } = await useFetch('/api/firebase/categories', {
      method: 'post',
      body: doc,
      initialCache: false
    });
    return data.value;
  };
  const deleteCategoriesAPI = async id => {
    const { data } = await useFetch(`/api/firebase/categories`, {
      method: 'delete',
      body: {
        id
      },
      initialCache: false
    });
    return data.value;
  };
  // 文章
  const getPostsAPI = async id => {
    const { data } = await useFetch(`/api/firebase/posts/${id}`, {
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
  const updatePostsAPI = async (id, doc) => {
    const { data } = await useFetch(`/api/firebase/posts/${id}`, {
      method: 'put',
      body: doc,
      initialCache: false
    });
    return data.value;
  };

  // const getFirebaseDocData = async (col, id) => {
  //   const { data } = await useFetch(`/api/firebase/docData?col=${col}&id=${id}`, {
  //     initialCache: false
  //   });
  //   return data.value;
  // };
  // const getFirebaseData = async col => {
  //   const { data } = await useFetch(`/api/firebase/data?col=${col}`, {
  //     initialCache: false
  //   });
  //   return data.value;
  // };
  // const addFirebaseData = async (col, doc) => {
  //   const { data } = await useFetch(`/api/firebase/add?col=${col}`, {
  //     method: 'post',
  //     body: doc,
  //     initialCache: false
  //   });
  //   return data.value;
  // };
  // const updateFirebaseData = async (col, id, doc) => {
  //   const { data } = await useFetch(`/api/firebase/update?col=${col}&id=${id}`, {
  //     method: 'post',
  //     body: doc,
  //     initialCache: false
  //   });
  //   return data.value;
  // };
  // const deleteFirebaseData = async (col, id) => {
  //   const { data } = await useFetch(`/api/firebase/delete?col=${col}&id=${id}`, {
  //     method: 'delete',
  //     initialCache: false
  //   });
  //   return data.value;
  // };

  return {
    getCategoriesListAPI,
    addCategoriesAPI,
    deleteCategoriesAPI,
    getPostsAPI,
    addPostsAPI,
    updatePostsAPI
  };
}
