import firebaseServer from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  const { db } = firebaseServer();
  const params = await getRouterParams(event);
  const body = await readBody(event);

  const postId = params.id;
  if (!postId) {
    throw createError({ statusCode: 400, message: '請求錯誤' });
  }
  try {
    const postsRef = db.collection('posts');
    await postsRef.doc(postId).update(body);

    return { status: 'success' };
  } catch (error) {
    throw createError({ statusCode: 500, message: '編輯文章失敗' });
  }
});
