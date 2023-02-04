import firebaseServer from '@/server/utils/useFirebaseServer';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  try {
    const { db } = firebaseServer();
    const postsRef = db.collection('posts');

    const snapshot = await postsRef.where('status', '==', 'public').get();

    // firebase 取得所有標籤
    const tags = [];
    snapshot.forEach(doc => {
      const item = doc.data();
      item.tags.forEach(tag => {
        tags.push(tag);
      });
    });

    // 標籤排序
    tags.sort((a, b) => {
      return a.length - b.length;
    });

    // 刪除重複 tag
    const deleteRepeatTags = [...new Set(tags)];

    // 每個標籤文章數
    const data = [];
    deleteRepeatTags.forEach(tag => {
      let filtersTagCount = tags.filter(tag2 => tag2 === tag).length;
      const obj = { name: '', count: 0 };
      obj.name = tag;
      obj.count = filtersTagCount;
      data.push(obj);
    });

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
