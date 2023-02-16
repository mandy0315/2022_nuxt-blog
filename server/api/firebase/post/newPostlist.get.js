import firebaseServer from '@/server/utils/useFirebase';

const getPostListFromFirebase = async () => {
  const { db } = firebaseServer();
  const postsRef = db.collection('posts');

  const snapshot = await postsRef.where('status', '==', 'public').orderBy('update_time', 'desc').limit(5).get();

  const postList = [];
  snapshot.forEach(doc => {
    postList.push(doc.data());
  });

  return postList;
};

export default defineEventHandler(async event => {
  try {
    const postList = await getPostListFromFirebase();
    return {
      status: 'success',
      data: {
        list: postList
      }
    };
  } catch (error) {
    console.log(error);
    throw createError({ statusCode: 500, message: '取得最新筆記失敗' });
  }
});
