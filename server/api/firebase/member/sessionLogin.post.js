import firebaseServer from '@/server/utils/useFirebaseServer';

export default defineEventHandler(async event => {
  const body = await readBody(event);
  const expiresIn = 60 * 60 * 24 * 1 * 1000; // 1 day

  const { auth } = firebaseServer();
  try {
    const sessionCookie = await auth.createSessionCookie(body.accessToken, { expiresIn });
    const options = { maxAge: expiresIn, secure: true, path: '/' };
    setCookie(event, 'access_token', sessionCookie, options);
    return { status: 'success' };
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: '登入授權失敗'
    });
  }
});
