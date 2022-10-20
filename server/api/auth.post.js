import { firebaseAuth } from '../utils/firebaseClient';

export default defineEventHandler(async event => {
  const body = await useBody(event);
  console.log(body);
  // console.log(firebaseAuth);
});
