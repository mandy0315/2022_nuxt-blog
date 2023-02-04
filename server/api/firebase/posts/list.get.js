import { markdownToTxt } from '@/server/utils/useMarkdown';
import firebaseServer from '@/server/utils/useFirebaseServer';
import pagination from '@/server/utils/usePagination';

const sortListMap = new Map([
  [0, 'desc'],
  [1, 'asc']
]);

const getSearchFilterData = (data, currentSearch) => {
  const strArray = currentSearch.split(' ');
  let filterData = [];
  // 比對字串
  strArray.forEach(str => {
    data.forEach(item => {
      if (item.title.includes(str) || markdownToTxt(item.content).includes(str)) {
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

    // firebase
    const { db } = firebaseServer();
    const postsRef = db.collection('posts');
    const snapshot = await postsRef
      .where('status', '==', currentState)
      .orderBy('update_time', sortListMap.get(currentSort))
      .get();
    let data = [];
    snapshot.forEach(doc => {
      data.push(doc.data());
    });

    if (currentSearch !== '') {
      data = getSearchFilterData(data, currentSearch);
    }

    const result = pagination({ currPage: currentPage, perPage: 2, articles: data });

    return {
      status: 'success',
      data: {
        pageInfo: result.pageInfo,
        articleList: result.data
      }
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: '取得失敗，請稍候' });
  }
});
