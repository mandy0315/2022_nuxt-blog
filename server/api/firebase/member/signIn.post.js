import { doc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/server/utils/useFirebase';
const getUidBySignIn = body => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, body.account, body.password)
      .then(userCredential => resolve(userCredential.user.uid))
      .catch(error => {
        reject(
          createError({
            statusCode: 400,
            message: error.message
          })
        );
      });
  });
};

export default defineEventHandler(async event => {
  const body = await readBody(event);
  const uid = await getUidBySignIn(body);
  return { status: 'success', message: '登入成功', data: { memberId: uid } };
});
