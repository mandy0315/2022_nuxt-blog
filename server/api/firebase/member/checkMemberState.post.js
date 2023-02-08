import firebaseServer from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  const { auth } = firebaseServer();
  const body = await readBody(event);

  try {
    const decodedClaims = await auth.verifySessionCookie(body.accessToken, true);

    return { status: 'success', info: decodedClaims };
  } catch (error) {
    return { status: 'notsuccess' };
  }
});
