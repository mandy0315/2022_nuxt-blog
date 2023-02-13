import firebaseServer from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  const { db } = firebaseServer();
  const params = getRouterParams(event);

  const postId = params.id;
  if (!postId) {
    throw createError({ statusCode: 400, message: '請求錯誤' });
  }
  try {
    const postsRef = db.collection('posts');
    await postsRef.doc(postId).delete();

    return { status: 'success' };
  } catch (error) {
    throw createError({ statusCode: 500, message: '刪除文章失敗' });
  }
});
