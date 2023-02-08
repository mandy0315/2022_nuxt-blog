import { markdownToTxt } from '@/server/utils/useMarkdown';
import firebaseServer from '@/server/utils/useFirebase';
import pagination from '@/server/utils/usePagination';

const getPostListFromFirebase = async ({ currentState, currentSort, memberId }) => {
  const { db } = firebaseServer();
  const postsRef = db.collection('posts');

  const sortListMap = new Map([
    [0, 'desc'],
    [1, 'asc']
  ]);

  const snapshot = await postsRef
    .where('status', '==', currentState)
    .where('member_id', '==', memberId)
    .orderBy('update_time', sortListMap.get(currentSort))
    .get();

  const postList = [];
  snapshot.forEach(doc => {
    postList.push(doc.data());
  });

  return postList;
};

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
  const urlQuery = getQuery(event);
  const params = getRouterParams(event);

  const currentState = urlQuery.publishState === 'On' ? 'public' : 'draft'; // 狀態
  const currentPage = +urlQuery.page || 1; // 頁數
  const currentSort = +urlQuery.sort || 0; // 排序
  const currentSearch = urlQuery.search || ''; // 搜尋
  const memberId = params.memberId || ''; // 會員 id
  try {
    let postList = await getPostListFromFirebase({
      currentState,
      currentSort,
      memberId
    });

    if (currentSearch !== '') {
      postList = getSearchFilterData(postList, currentSearch);
    }

    const result = pagination({ currPage: currentPage, perPage: 2, articles: postList });

    return {
      status: 'success',
      data: {
        pageInfo: result.pageInfo,
        list: result.data
      }
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: '取得失敗，請稍候' });
  }
});
