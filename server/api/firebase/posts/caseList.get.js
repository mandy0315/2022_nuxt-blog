import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/server/utils/useFirebase';
import pagination from '@/server/utils/usePagination';

const sortListMap = new Map([
  [0, postsRef => query(postsRef, orderBy('update_time', 'desc'))],
  [1, postsRef => query(postsRef, orderBy('update_time'))]
]);

export default defineEventHandler(async event => {
  try {
    const urlQuery = getQuery(event);
    const currentState = urlQuery.publishState === 'On' ? 'public' : 'draft';
    const currentPage = +urlQuery.page;
    const currentSort = +urlQuery.sort || 0;

    const postsRef = collection(db, 'posts');
    const q = sortListMap.get(currentSort)(postsRef);

    const snapshot = await getDocs(q);
    let data = [];
    snapshot.forEach(doc => {
      if (doc.data().status === currentState) {
        data.push(doc.data());
      }
    });

    const result = pagination({ currPage: currentPage, perPage: 2, articles: data });

    return {
      success: true,
      result: {
        pageInfo: result.pageInfo,
        articleList: result.data
      }
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
