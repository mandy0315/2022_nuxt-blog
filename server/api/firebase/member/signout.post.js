import { signOut } from 'firebase/auth';
import { auth } from '@/server/utils/useFirebase';

export default defineEventHandler(async () => {
  try {
    signOut(auth)
      .then(() => {
        console.log('yes');
        return { success: true };
      })
      .catch(error => {
        // An error happened.
      });
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
