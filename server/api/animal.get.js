import { db } from '../utils/firebaseInit';
import { doc, getDoc } from 'firebase/firestore';

export default defineEventHandler(async event => {
  const ref = doc(db, 'lists', 'B5NIsSDzdjcalkqe5z7Y');
  const docSnap = await getDoc(ref);
  console.log(docSnap.data());
  // if (docSnap.exists()) {
  //   console.log('Document data:', docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log('No such document!');
  // }

  return '122';
});
