import { auth } from '../utils/firebaseInit';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

export default defineEventHandler(async event => {
  const body = await useBody(event);
  console.log(body);
  console.log('auth', auth);
});
