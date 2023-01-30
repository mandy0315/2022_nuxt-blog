import firebaseServer from '@/server/utils/useFirebaseServer';

export default defineEventHandler(async event => {
  const { auth } = firebaseServer();

  try {
    const accessToken = await getCookie(event, 'access_token');

    const decodedClaims = await auth.verifySessionCookie(accessToken, true);

    return { status: 'success', info: decodedClaims };
  } catch (error) {
    return { status: 'notsuccess' };
  }
});
