// import { storage } from '@/server/libs/firebase';
import formidable from 'formidable';

export default defineEventHandler(async event => {
  // h3 無法解析 formData ，需要透過 formidable 解析上傳文件
  // https://github.com/node-formidable/formidable
  const { fields, files } = await readFiles(event);
  console.log('files', files);
  console.log('fields', fields);

  return { api: 'uploadImage' };
});

const readFiles = (event, options = {}) => {
  return new Promise((resolve, reject) => {
    const form = formidable(options);
    form.parse(event.req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ fields, files });
    });
  });
};
