import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/server/libs/firebase';

export default defineEventHandler(async event => {
  try {
    const query = useQuery(event.req);
    const colRef = collection(db, query.col);
    const snapshot = await getDocs(colRef);
    const data = Array.from(snapshot.docs).map(doc => {
      return {
        ...doc.data(),
        id: doc.id
      };
    });
    return { success: true, result: data };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
