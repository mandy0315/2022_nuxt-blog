import useUpIoadImage from '@/server/utils/useUpIoadImage.js';

export default defineEventHandler(async event => {
  const { readFiles, verifyFormat } = useUpIoadImage();

  // 讀取 FormData 資料
  const { fields, files } = await readFiles(event).catch(error => {
    throw createError({ statusCode: 500, statusMessage: error.message });
  });
  const base64Img = fields.base64Img;
  const file = files.file;

  // 驗證資料
  const { isError, msg } = await verifyFormat(file.size, file.mimetype);
  if (isError) {
    throw createError({
      statusCode: 404,
      statusMessage: 'file verify error',
      data: {
        error: msg
      }
    });
  }

  const { data, error } = await $fetch('https://api.imgur.com/3/upload', {
    method: 'POST',
    headers: {
      authorization: 'Bearer 5a109bdb348d69e42c7e692a9a2c0e6ce6b92cbc'
    },
    async: true,
    crossDomain: true,
    data: {
      image: base64Img,
      album: 'jG2LPJI',
      type: 'base64',
      name: file.originalFilename
    }
  });
  console.log(data);

  return { api: 'uploadImage' };
});
