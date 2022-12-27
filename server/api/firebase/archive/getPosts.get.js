import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  try {
    const urlQuery = getQuery(event);
    console.log(urlQuery.tag);
    const currentTag = urlQuery.tag;

    const postsRef = collection(db, 'posts');
    let q;
    if (currentTag) {
      q = query(
        postsRef,
        where('status', '==', 'public'),
        where('tags', 'array-contains-any', [currentTag]),
        orderBy('update_time', 'desc')
      ); // firestore 管理去建立索引
    } else {
      q = query(postsRef, where('status', '==', 'public'), orderBy('update_time', 'desc'));
    }

    let snapshot = await getDocs(q);
    const data = [];
    snapshot.forEach(doc => {
      data.push(doc.data());
    });

    return {
      success: true,
      result: { data }
    };
  } catch (error) {
    return {
      success: false,
      result: {}
    };
  }
});
