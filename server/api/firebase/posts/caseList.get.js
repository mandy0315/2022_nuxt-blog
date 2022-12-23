import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/server/utils/useFirebase';
import pagination from '@/server/utils/usePagination';

const sortListMap = new Map([
  [0, () => orderBy('update_time', 'desc')],
  [1, () => orderBy('update_time')]
]);
const getSearchFilterData = (data, currentSearch) => {
  const strArray = currentSearch.split(' ');
  let filterData = [];
  // 比對字串
  strArray.forEach(str => {
    data.forEach(item => {
      if (item.title.includes(str) || item.summary.includes(str)) {
        filterData.push(item);
      }
    });
  });
  filterData = [...new Set(filterData)];
  return filterData;
};

export default defineEventHandler(async event => {
  try {
    const urlQuery = getQuery(event);
    const currentState = urlQuery.publishState === 'On' ? 'public' : 'draft';
    const currentPage = +urlQuery.page;
    const currentSort = +urlQuery.sort || 0; // 預設排序: 時間新->舊
    const currentSearch = urlQuery.search || '';

    const postsRef = collection(db, 'posts');
    const q = query(postsRef, sortListMap.get(currentSort)());

    const snapshot = await getDocs(q);
    let data = [];
    snapshot.forEach(doc => {
      if (doc.data().status === currentState) {
        data.push(doc.data());
      }
    });

    if (currentSearch !== '') {
      data = getSearchFilterData(data, currentSearch);
    }

    const result = pagination({ currPage: currentPage, perPage: 2, articles: data });

    return {
      success: true,
      result: {
        pageInfo: result.pageInfo,
        articleList: result.data
      }
    };
  } catch (error) {
    return {
      success: true,
      result: {
        articleList: []
      }
    };
  }
});
