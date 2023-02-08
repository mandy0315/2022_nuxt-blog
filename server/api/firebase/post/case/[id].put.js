import firebaseServer from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  const { db } = firebaseServer();
  const params = await getRouterParams(event);
  const body = await readBody(event);

  const postId = params.id;
  try {
    const postsRef = db.collection('posts').doc(postId);
    await postsRef.update(body);

    return { status: 'success' };
  } catch (error) {
    throw createError({ statusCode: 500, message: '編輯文章失敗' });
  }
});
