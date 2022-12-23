import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/server/utils/useFirebase';

export default defineEventHandler(async event => {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('status', '==', 'public'));
    const snapshot = await getDocs(q);

    // 取得所有 tags
    const tags = [];
    snapshot.forEach(doc => {
      const item = doc.data();
      item.tags.forEach(tag => {
        tags.push(tag);
      });
    });
    tags.sort((a, b) => {
      return a.length - b.length;
    });

    // 篩選每個 tag 數量
    const notRepeatTags = [...new Set(tags)];
    const data = [];
    notRepeatTags.forEach(tag => {
      let filtersTagCount = tags.filter(tag2 => tag2 === tag).length;
      let obj = {
        name: tag,
        count: filtersTagCount
      };
      data.push(obj);
    });

    return {
      success: true,
      result: {
        data
      }
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
