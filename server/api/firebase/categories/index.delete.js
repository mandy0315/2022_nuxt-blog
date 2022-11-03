import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/server/libs/firebase';

export default defineEventHandler(async event => {
  try {
    const body = await useBody(event.req);
    await deleteDoc(doc(db, 'categories', body.id));

    return { success: true };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
