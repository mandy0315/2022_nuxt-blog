import { storage } from '@/utils/firebase/useFirebase';
// import client from '@/utils/imgur/useImgur';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function () {
  // props-toolbar 配置
  const toolbarConfig = {
    leftToolbar: 'h bold italic strikethrough quote | ul ol table hr |  link code images iframes | clear',
    rightToolbar: 'preview sync-scroll'
  };

  // props-toolbar 自訂
  const toolbarCustom = {
    iframes: {
      title: 'insert iframes',
      icon: 'v-md-icon-iframe',
      menus: [
        {
          text: 'codepen',
          action(editor) {
            editor.insert(function (selected) {
              const prefix = '@[codepen](';
              const suffix = ')';
              const placeholder = 'http://';
              const content = placeholder;

              return {
                text: `${prefix}${content}${suffix}`
              };
            });
          }
        },
        {
          text: 'jsfiddle',
          action(editor) {
            editor.insert(function (selected) {
              const prefix = '@[jsfiddle](';
              const suffix = ')';
              const placeholder = 'http://';
              const content = placeholder;

              return {
                text: `${prefix}${content}${suffix}`
              };
            });
          }
        }
      ]
    },

    images: {
      title: 'Insert images',
      icon: 'v-md-icon-images',
      menus: [
        {
          name: 'menu1',
          text: 'link',
          action(editor) {
            editor.insert(function (selected) {
              const prefix = '![Description](';
              const suffix = '){{{width="auto" height="auto"}}}';
              const placeholder = 'http://';
              const content = placeholder;

              return {
                text: `${prefix}${content}${suffix}`
              };
            });
          }
        },
        {
          name: 'menu2',
          text: 'Cloud Storage',
          action(editor) {
            editor.$nextTick(async () => {
              const event = await editor.$refs.uploadFile.upload();
              const file = event.target.files[0];
              const url = await uploadFileToStorage(file);
              insertURL(editor, file.name, url);
            });
          }
        },
        {
          name: 'menu3',
          text: 'Imgur',
          action(editor) {
            editor.$nextTick(async () => {
              const event = await editor.$refs.uploadFile.upload();
              const file = event.target.files[0];
              const url = await uploadFileToImgur(file);
              // insertURL(editor, file.name, url);
            });
          }
        }
      ]
    }
  };

  return {
    toolbarConfig,
    toolbarCustom
  };
}

const uploadFileToStorage = file => {
  return new Promise((resolve, reject) => {
    const fileRef = ref(storage, `/posts/${file.name}`);
    uploadBytes(fileRef, file)
      .then(snapshot => {
        return getDownloadURL(fileRef);
      })
      .then(url => {
        resolve(url);
      })
      .catch(err => reject(err));
  });
};

const uploadFileToImgur = async file => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async e => {
    let base64Img = e.target.result;
    const test = base64Img.replace(`data:${file.type};base64,`, '');
    console.log('test', test);

    let form = new FormData();
    form.append('file', file);
    form.append('base64Img', base64Img);

    const { data } = await useFetch('/api/uploadImage', {
      method: 'POST',
      body: form
    });
  };
  // let form = new FormData();
  // form.append('image', file);

  // const { data } = await useFetch('/api/uploadImage', {
  //   method: 'POST',
  //   body: form
  // });
  // const { data } = await useFetch('https://api.imgur.com/3/upload', {
  //   method: 'POST',
  //   data: formData,
  //   headers: {
  //     Authorization: 'Client-ID {{a0733a9b8a9493e}}'
  //   },
  //   mimeType: 'multipart/form-data'
  // });
  // console.log(data);
};

const insertURL = (editor, fileName, fileUrl) => {
  editor.insert(function (selected) {
    const prefix = `![${fileName}](`;
    const suffix = '){{{width="auto" height="auto"}}}';
    const placeholder = fileUrl;
    const content = placeholder;

    return {
      text: `${prefix}${content}${suffix}`
    };
  });
};
