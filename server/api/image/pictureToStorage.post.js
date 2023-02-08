// import { readFiles, verifyFormat } from '@/server/utils/useUpIoadImage.js';
// import { ref, uploadString, getDownloadURL } from 'firebase/storage';
// import { storage } from '@/server/utils/useFirebase';

// export default defineEventHandler(async event => {
//   // 取得相簿值
//   const query = getQuery(event);
//   if (!query.album) {
//     throw createError({
//       statusCode: 404,
//       statusMessage: 'album query not defined'
//     });
//   }
//   const album = query.album;

//   // 讀取 FormData 資料
//   const { fields, files } = await readFiles(event).catch(error => {
//     throw createError({ statusCode: 500, statusMessage: error.message });
//   });
//   const base64Img = fields.base64Img;
//   const file = files.file;

//   // 驗證資料
//   const result = verifyFormat(file.size, file.mimetype);
//   if (result.isError) {
//     throw createError({
//       statusCode: 404,
//       statusMessage: 'image verify error',
//       data: {
//         error: result.msg
//       }
//     });
//   }

//   // 上傳圖片
//   const fileRef = ref(storage, `/${album}/${file.originalFilename}`);
//   return new Promise((resolve, reject) => {
//     uploadString(fileRef, base64Img, 'base64')
//       .then(snapshot => {
//         return getDownloadURL(fileRef);
//       })
//       .then(url => {
//         resolve({
//           result: {
//             link: url
//           }
//         });
//       })
//       .catch(error => reject(error));
//   });
// });
