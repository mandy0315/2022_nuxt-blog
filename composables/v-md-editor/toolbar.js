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
          name: 'menu2',
          text: 'Cloud Storage',
          action(editor) {
            editor.$nextTick(async () => {
              const event = await editor.$refs.uploadFile.upload();
              const file = event.target.files[0];
              console.log(file.name);
              // 上傳資料
              let formData = new FormData();
              formData.append('fileName', file.name);
              formData.append('file', file);

              const { uploadImageAPI } = useFirebase();
              const data = await uploadImageAPI(formData);
            });
            console.log('你点击了菜单2ccc');
          }
        },
        {
          name: 'menu3',
          text: 'Imgur',
          action() {
            console.log('你点击了菜单3');
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
