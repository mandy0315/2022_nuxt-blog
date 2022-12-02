import formidable from 'formidable';

export default function () {
  const readFiles = (event, options = {}) => {
    return new Promise((resolve, reject) => {
      const form = formidable(options);
      form.parse(event.req, (err, fields, files) => {
        if (err) reject(err);

        resolve({ fields, files });
      });
    });
  };
  const verifyFormat = (size, type) => {
    let isError = false;
    let msg = '';
    return new Promise((resolve, reject) => {
      if (+size / 1024 > 200) {
        isError = true;
        msg = '圖片限制在 200 kb';
        resolve({ isError, msg });
      }
      const reg = /^image\/[gif|jpeg|png]/g;
      if (!reg.test(type)) {
        isError = true;
        msg = '圖片格式錯誤，請再次確認';
        resolve({ isError, msg });
      }
      resolve({ isError, msg });
    });
  };

  return {
    readFiles,
    verifyFormat
  };
}
