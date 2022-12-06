import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  try {
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, orderBy('update_time', 'desc'));
    const snapshot = await getDocs(q);
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
