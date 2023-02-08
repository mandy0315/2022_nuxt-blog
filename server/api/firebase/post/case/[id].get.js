import firebaseServer from '@/server/utils/useFirebaseServer';

export default defineEventHandler(async event => {
  const params = getRouterParams(event);
  const postId = params.id;
  try {
    const { db } = firebaseServer();
    const postsRef = db.collection('posts').doc(postId);
    const doc = await postsRef.get();

    let conditions = {};
    if (doc.exists) {
      Object.assign(conditions, doc.data());
    }

    return {
      status: 'success',
      data: {
        conditions
      }
    };
  } catch (error) {
    throw createError({ statusCode: 500, message: '取得文章失敗' });
  }
});
