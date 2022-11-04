import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/server/libs/firebase';

export default defineEventHandler(async event => {
  try {
    const params = getRouterParams(event);
    await deleteDoc(doc(db, 'categories', params.id));

    return { success: true };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
