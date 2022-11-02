import { collection, addDoc, doc } from 'firebase/firestore';
import { db } from '@/server/libs/firebase';

export default defineEventHandler(async event => {
  try {
    const query = useQuery(event.req);
    const body = await useBody(event.req);

    const ref = collection(db, query.col);
    const refId = doc(ref).id;
    body.id = refId;
    await addDoc(ref, body);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
