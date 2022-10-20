import { firebase } from '../utils/firebaseAdmin';

export default defineEventHandler(async event => {
  const ref = firebase.collection('lists').doc('B5NIsSDzdjcalkqe5z7Y');
  const snapshot = await ref.get();
  const data = snapshot.data();
  return data;
});
