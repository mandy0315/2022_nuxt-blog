import firebaseServer from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  const { db } = firebaseServer();
  const body = await readBody(event);
  try {
    const postsRef = db.collection('posts');
    const doc = postsRef.doc();
    body.id = doc.id; // 取的 id
    await doc.set(body);

    return { status: 'success' };
  } catch (error) {
    throw createError({ statusCode: 500, message: '編輯文章失敗' });
  }
});
