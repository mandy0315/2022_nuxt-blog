import useDateTime from '@/utils/useDateTime';
import firebaseServer from '@/server/utils/useFirebase';

const getPostListFromFirebase = async () => {
  const { db } = firebaseServer();
  const { dateFormat } = useDateTime();
  const postsRef = db.collection('posts');

  const snapshot = await postsRef.where('status', '==', 'public').orderBy('update_time', 'desc').get();

  const postList = [];
  snapshot.forEach(doc => {
    const post = doc.data();
    const year = dateFormat(post.update_time, 'YYYY');
    const date = dateFormat(post.update_time, 'MM-DD');
    const obj = {
      title: post.title,
      id: post.id,
      update_at_year: year,
      update_at_date: date
    };
    postList.push(obj);
  });
  return postList;
};
const getYearByPostList = posts => {
  const years = [];
  posts.forEach(post => {
    years.push(+post.update_at_year);
  });
  const notRepeatYears = [...new Set(years)];
  const yearSortToDesc = notRepeatYears.sort((a, b) => b - a); // 降序
  const contentToString = yearSortToDesc.map(year => String(year));
  return contentToString;
};
const getYearListByPostList = (years, posts) => {
  const yearList = [];
  years.forEach(year => {
    let obj = { year: '', list: [] };
    obj.year = String(year);
    posts.forEach(post => {
      if (year === post.update_at_year) {
        obj.list.push(post);
      }
    });
    yearList.push(obj);
  });
  return yearList;
};

export default defineEventHandler(async event => {
  const query = getQuery(event);

  try {
    const postList = await getPostListFromFirebase();
    const years = getYearByPostList(postList);
    const yearList = getYearListByPostList(years, postList);

    const currentYear = query.year ? query.year : years[0];
    const filterCurrentYearOfList = yearList.filter(item => item.year === currentYear);

    return {
      status: 'success',
      data: {
        years,
        postList: filterCurrentYearOfList
      }
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: '取得失敗，請稍候' });
  }
});
