import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase/useFirebase';

export default defineEventHandler(async event => {
  try {
    const params = getRouterParams(event);
    await deleteDoc(doc(db, 'posts', params.id));

    return { success: true };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
