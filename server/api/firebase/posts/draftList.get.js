import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/server/utils/useFirebase';
import pagination from '@/server/utils/usePagination';

export default defineEventHandler(async event => {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('update_time', 'desc'));

    const snapshot = await getDocs(q);
    let data = [];
    snapshot.forEach(doc => {
      if (doc.data().status === 'draft') {
        data.push(doc.data());
      }
    });
    console.log(data);
    const urlQuery = getQuery(event);
    const result = pagination({ currPage: urlQuery.page, perPage: 10, articles: data });

    return {
      success: true,
      result: {
        ...result.pageInfo,
        articleList: result.data
      }
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
