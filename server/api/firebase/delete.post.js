import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/server/libs/firebase';

export default defineEventHandler(async event => {
  try {
    const query = useQuery(event.req);
    await deleteDoc(doc(db, query.col, query.id));

    return { success: true };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
