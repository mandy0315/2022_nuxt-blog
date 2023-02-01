import firebaseServer from '@/server/utils/useFirebaseServer';

export default defineEventHandler(async event => {
  try {
    const { db } = firebaseServer();
    const params = await getRouterParams(event);
    const body = await readBody(event);

    const postsRef = db.collection('posts').doc(params.id);
    await postsRef.update(body);

    return { status: 'success' };
  } catch (error) {
    throw createError({ statusCode: 500, message: '編輯文章失敗' });
  }
});
