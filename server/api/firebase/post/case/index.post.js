import firebaseServer from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  try {
    const { db } = firebaseServer();
    const body = await readBody(event);

    const postsRef = db.collection('posts').doc();
    body.id = postsRef.id; // 取的 id
    await postsRef.set(body);

    return { status: 'success' };
  } catch (error) {
    throw createError({ statusCode: 500, message: '編輯文章失敗' });
  }
});
