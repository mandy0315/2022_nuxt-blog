import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  const body = await readBody(event);

  return signInWithEmailAndPassword(auth, body.account, body.password)
    .then(userCredential => ({ status: 'success', message: '登入成功', data: { memberId: userCredential.user.uid } }))
    .catch(error => {
      throw createError({
        statusCode: 400,
        message: error.message
      });
    });
});
