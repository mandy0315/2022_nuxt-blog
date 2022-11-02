import { collection, setDoc, doc } from 'firebase/firestore';
import { db } from '@/server/libs/firebase';

export default defineEventHandler(async event => {
  try {
    const query = useQuery(event.req);
    const body = await useBody(event.req);

    const ref = collection(db, query.col);
    const refId = doc(ref).id;
    body.id = refId;
    await setDoc(doc(ref, refId), body);

    return { success: true, id: refId };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
