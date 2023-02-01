import firebaseServer from '@/server/utils/useFirebaseServer';

export default defineEventHandler(async event => {
  try {
    const { db } = firebaseServer();
    const body = await readBody(event);

    const postsRef = db.collection('posts');
    const postsDoc = postsRef.doc();
    body.id = postsDoc.id; // 取的 id
    await postsDoc.set(body);

    return { status: 'success' };
  } catch (error) {
    throw createError({ statusCode: 500, message: '編輯文章失敗' });
  }
});
