const uploadFile = async (file, path) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async e => {
      let base64Img = e.target.result;
      base64Img = base64Img.replace(`data:${file.type};base64,`, '');

      let form = new FormData();
      form.append('file', file);
      form.append('base64Img', base64Img);

      const { data } = await useFetch(`/api/image/${path}?album=post`, {
        method: 'POST',
        body: form
      });
      resolve(data.value);
    };
  });
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
              const data = await uploadFile(file, 'pictureToStorage');
              insertURL(editor, file.name, data.result?.link);
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
              const data = await uploadFile(file, 'pictureToImgur');
              insertURL(editor, file.name, data.result?.link);
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
