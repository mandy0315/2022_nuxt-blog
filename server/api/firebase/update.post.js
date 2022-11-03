import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/server/libs/firebase';

export default defineEventHandler(async event => {
  try {
    const query = useQuery(event.req);
    const body = await useBody(event.req);
    const docRef = doc(db, query.col, query.id);
    await updateDoc(docRef, body);

    return { success: true, id: body.id };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
