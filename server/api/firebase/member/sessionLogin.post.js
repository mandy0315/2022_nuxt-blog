import firebaseServer from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  const body = await readBody(event);

  const { auth } = firebaseServer();
  try {
    const expiresIn = 1 * 24 * 60 * 60; // 1 day 秒單位

    const sessionCookie = await auth.createSessionCookie(body.accessToken, { expiresIn: expiresIn * 1000 }); // expiresIn 毫秒為單位

    await setCookie(event, 'access_token', sessionCookie, {
      maxAge: expiresIn,
      secure: true,
      path: '/'
    }); // maxAge 秒為單位

    return { status: 'success' };
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: '登入授權失敗'
    });
  }
});
