import firebaseServer from '@/server/utils/useFirebaseServer';

export default defineEventHandler(async event => {
  const body = await readBody(event);
  const { auth } = firebaseServer();

  try {
    const decodedClaims = await auth.verifySessionCookie(body.accessToken);
    await auth.revokeRefreshTokens(decodedClaims.sub);
    deleteCookie(event, 'access_token');

    return { status: 'success' };
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: '登出授權失敗'
    });
  }
});
