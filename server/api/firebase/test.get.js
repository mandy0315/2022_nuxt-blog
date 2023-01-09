import { collection, getDocs, query, doc, setDoc } from 'firebase/firestore';
import { db } from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  // try {
  //   const querySnapshot = await getDocs(collection(db, 'posts'));
  //   const data = [];
  //   querySnapshot.forEach(doc => {
  //     data.push(doc.data());
  //   });
  //   data.forEach(item => {
  //     const obj = item.tags.map(tag => tag.toLowerCase());
  //     item.tags = obj;
  //   });
  //   for (const item of data) {
  //     console.log(item);
  //     await setDoc(doc(db, 'posts', item.id), item);
  //   }
  //   return {
  //     success: true,
  //     result: {}
  //   };
  // } catch (error) {
  //   throw createError({ statusCode: 500, statusMessage: error.message });
  // }
  const dd = collection(db, 'user', '0FPqgwLWwOAsVN7mXhp2', 'posts');

  const querySnapshot = await getDocs(dd);
  querySnapshot.forEach(doc => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
  });
});
