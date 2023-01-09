import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  const params = getRouterParams(event);

  const docRef = doc(db, 'posts', params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      success: true,
      result: {
        data: docSnap.data()
      }
    };
  } else {
    return { success: false, result: {} };
  }
});
