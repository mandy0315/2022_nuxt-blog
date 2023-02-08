import firebaseServer from '@/server/utils/useFirebase';

const getTagsFromFirebase = async () => {
  const { db } = firebaseServer();
  const postsRef = db.collection('posts');

  const snapshot = await postsRef.where('status', '==', 'public').get();

  const tags = [];
  snapshot.forEach(doc => {
    const item = doc.data();
    item.tags.forEach(tag => {
      tags.push(tag);
    });
  });

  return tags;
};
const getPostCountByTags = (deleteRepeatTags, tags) => {
  const data = [];
  deleteRepeatTags.forEach(tag => {
    const filtersTagCount = tags.filter(tag2 => tag2 === tag).length; // 每個標籤文章數
    const obj = { name: tag, count: filtersTagCount };
    data.push(obj);
  });
  return data;
};
export default defineEventHandler(async event => {
  try {
    const tags = await getTagsFromFirebase();

    const tagsSortToLenAsc = tags.sort((a, b) => {
      return a.length - b.length;
    });

    const deleteRepeatTags = [...new Set(tagsSortToLenAsc)];

    const data = getPostCountByTags(deleteRepeatTags, tags);

    return {
      status: 'success',
      data: {
        list: data
      }
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: '取得失敗，請稍候' });
  }
});
