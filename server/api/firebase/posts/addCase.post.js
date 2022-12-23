import { collection, setDoc, doc } from 'firebase/firestore';
import { db } from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event);

    const docRef = doc(collection(db, 'posts'));
    body.id = docRef.id;
    await setDoc(docRef, body);

    return { success: true, id: body.id };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
