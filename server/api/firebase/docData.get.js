import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/server/libs/firebase';

export default defineEventHandler(async event => {
  try {
    const query = useQuery(event.req);

    const docRef = doc(db, query.col, query.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, result: docSnap.data() };
    } else {
      return { success: false, result: [] };
    }
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
