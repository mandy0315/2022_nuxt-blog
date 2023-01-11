import { collection, getDocs, query, doc, setDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { db, auth } from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  console.log('yes');
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
  // const dd = collection(db, 'user', '0FPqgwLWwOAsVN7mXhp2', 'posts');

  // const querySnapshot = await getDocs(dd);
  // querySnapshot.forEach(doc => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, ' => ', doc.data());
  // });

  // 重設密碼
  sendPasswordResetEmail(auth, 'mandy3152618@gmail.com')
    .then(() => {
      console.log('已發送信件');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
});
