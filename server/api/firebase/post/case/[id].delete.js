import firebaseServer from '@/server/utils/useFirebaseServer';

export default defineEventHandler(async event => {
  const { db } = firebaseServer();
  const params = getRouterParams(event);

  const postId = params.id;
  try {
    const postsRef = db.collection('posts').doc(postId);
    await postsRef.delete();

    return { status: 'success' };
  } catch (error) {
    throw createError({ statusCode: 500, message: '刪除文章失敗' });
  }
});
