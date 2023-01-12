import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  const body = await readBody(event);

  return sendPasswordResetEmail(auth, body.email)
    .then(() => ({ status: 'success', message: '寄出成功' }))
    .catch(error => {
      throw createError({
        statusCode: 400,
        message: error.message
      });
    });
});
