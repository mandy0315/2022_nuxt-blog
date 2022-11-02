export default function () {
  const getFirebaseData = async col => {
    const { data } = await useFetch(`/api/firebase/data?col=${col}`, {
      initialCache: false
    });
    return data.value;
  };
  const addFirebaseData = async (col, doc) => {
    const { data } = await useFetch(`/api/firebase/add?col=${col}`, {
      method: 'post',
      body: doc,
      initialCache: false
    });
    return data.value;
  };
  const deleteFirebaseData = async (col, id) => {
    const { data } = await useFetch(`/api/firebase/delete?col=${col}&id=${id}`, {
      method: 'post',
      initialCache: false
    });
    return data.value;
  };

  return {
    getFirebaseData,
    addFirebaseData,
    deleteFirebaseData
  };
}
