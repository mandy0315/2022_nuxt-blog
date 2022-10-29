import mdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const setConfig = {
  languageUserDefined: {
    'zh-tw': {
      toolbarTips: {
        title: '標題',
        bold: '粗體',
        underline: '底線',
        italic: '斜線',
        strikeThrough: '刪除線',
        quote: '引號',
        unorderedList: '符號列表',
        orderedList: '數字列表',
        codeRow: '程式碼',
        code: '單橫程式碼',
        link: '連結',
        image: '圖片',
        table: '表格',
        preview: '預覽'
      },
      titleItem: {
        h2: 'H2 標題',
        h3: 'H3 標題',
        h4: 'H4 標題',
        h5: 'H5 標題',
        h6: 'H6 標題'
      },
      imgTitleItem: {
        link: '圖片連結',
        upload: '上傳檔案',
        clip2upload: '上傳裁切圖片'
      },
      linkModalTips: {
        title: '',
        descLable: '標題:',
        descLablePlaceHolder: '請輸入標題',
        urlLable: '連結:',
        UrlLablePlaceHolder: '請輸入連結',
        buttonOK: '確認'
      },
      clipModalTips: {
        title: '裁切圖片',
        buttonUpload: '確認'
      },
      footer: {
        markdownTotal: '字數',
        scrollAuto: '自動滾動'
      }
    }
  }
};
export default defineNuxtPlugin(nuxtApp => {
  mdEditor.config({
    editorConfig: { ...setConfig }
  });
  const mdCatalog = mdEditor.MdCatalog;
  nuxtApp.vueApp.component('mdEditor', mdEditor);
  nuxtApp.vueApp.component('mdCatalog', mdCatalog);
});
