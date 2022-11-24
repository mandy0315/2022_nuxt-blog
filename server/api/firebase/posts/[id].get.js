import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase/useFirebase';

export default defineEventHandler(async event => {
  try {
    const params = getRouterParams(event);

    const docRef = doc(db, 'posts', params.id);
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
