import { readFiles, verifyFormat } from '@/server/utils/useUpIoadImage.js';

export default defineEventHandler(async event => {
  // 取得相簿值
  const query = getQuery(event);
  if (!query.album) {
    throw createError({
      statusCode: 404,
      statusMessage: 'album query not defined'
    });
  }
  const albumIdList = {
    post: 'jG2LPJI'
  };
  const albumId = albumIdList[query.album];

  // 讀取 FormData 資料
  const { fields, files } = await readFiles(event).catch(error => {
    throw createError({ statusCode: 500, statusMessage: error.message });
  });
  const base64Img = fields.base64Img;
  const file = files.file;

  // 取得 token
  const token = await setToken(event);

  // 相簿已經有相同圖片直接使用
  const albumImages = await getAlbumImages(albumId, token);
  const arr = albumImages.length > 0 && albumImages.filter(item => item.name === file.originalFilename);
  if (arr.length === 1) {
    return {
      success: true,
      result: arr[0]
    };
  }

  // 驗證資料
  const result = verifyFormat(file.size, file.mimetype);
  if (result.isError) {
    throw createError({
      statusCode: 404,
      statusMessage: 'image verify error',
      data: {
        error: result.msg
      }
    });
  }

  // 上傳圖片
  const res = await $fetch('https://api.imgur.com/3/upload', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      contentType: 'multipart/form-data'
    },
    body: {
      image: base64Img,
      name: file.originalFilename,
      type: 'base64',
      album: albumId
    }
  }).catch(error => {
    const data = error.response._data;
    throw createError({
      statusCode: data.status,
      statusMessage: data?.data?.error,
      request: data?.data?.request
    });
  });
  return {
    success: res.success,
    result: res.data
  };
});

const setToken = async event => {
  let imgurToken = getCookie(event, 'imgur_token');

  if (!imgurToken) {
    const token = await getNewToken();
    imgurToken = token;

    const addTimes = 24 * 60 * 60 * 28; // 秒為單位;28天後過期
    setCookie(event, 'imgur_token', token, {
      path: '/',
      maxAge: addTimes,
      httpOnly: true,
      sameSite: true
    });
  }

  return imgurToken;
};

const getNewToken = async () => {
  const config = useRuntimeConfig();

  const res = await $fetch('https://api.imgur.com/oauth2/token', {
    method: 'POST',
    headers: {
      contentType: 'multipart/form-data'
    },
    body: {
      refresh_token: config.IMGUR_REFRESH_TOKEN,
      client_id: config.IMGUR_CLIENT_ID,
      client_secret: config.IMGUR_CLIENT_SECRET,
      grant_type: config.IMGUR_GRANT_TYPE
    }
  }).catch(error => {
    const data = error.response._data;
    throw createError({
      request: data?.data?.request,
      statusCode: data.status,
      statusMessage: data?.data?.error
    });
  });
  return res.access_token;
};

const getAlbumImages = async (albumId, token) => {
  const res = await $fetch(`https://api.imgur.com/3/album/${albumId}/images`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
