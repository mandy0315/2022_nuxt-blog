import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/server/libs/firebase';

export default defineEventHandler(async event => {
  try {
    const params = getRouterParams(event);
    const body = await useBody(event.req);

    const docRef = doc(db, 'posts', params.id);
    await updateDoc(docRef, body);

    return { success: true, id: body.id };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
