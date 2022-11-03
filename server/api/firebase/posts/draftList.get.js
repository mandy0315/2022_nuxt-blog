import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/server/libs/firebase';

export default defineEventHandler(async event => {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('update_time', 'desc'));

    const snapshot = await getDocs(q);
    let data = [];
    snapshot.forEach(doc => {
      if (doc.data().status === 'draft') {
        data.push(doc.data());
      }
    });

    return { success: true, result: data };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
