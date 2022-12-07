import VMdEditor from '@kangc/v-md-editor';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// 語言切換
import enUS from '@kangc/v-md-editor/lib/lang/en-US';
import hljs from './highlight';

// markdownIt 插件
import markdownItPlayground from 'markdown-it-playground';
// import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
// import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

export default defineNuxtPlugin(nuxtApp => {
  VMdEditor.lang.use('en-US', enUS); // 編輯器語言

  // XSS 清理不受信任 html
  VMdEditor.xss.extend({
    // extend white list
    whiteList: {
      source: [],
      iframe: ['src']
    }
  });
  VMdPreview.xss.extend({
    // extend white list
    whiteList: {
      source: [],
      iframe: ['src']
    }
  });

  VMdEditor.use(githubTheme, {
    Hljs: hljs,
    // 擴充程式碼語言顏色
    codeHighlightExtensionMap: {
      vue: 'html'
    },
    extend(md) {
      md.use(markdownItPlayground);
    }
  });
  VMdPreview.use(githubTheme, {
    Hljs: hljs,
    // 擴充程式碼語言顏色
    codeHighlightExtensionMap: {
      vue: 'html'
    },
    extend(md) {
      md.use(markdownItPlayground);
    }
  });

  // 套件擴充插件
  VMdEditor.use(createCopyCodePlugin());
  VMdPreview.use(createCopyCodePlugin());

  nuxtApp.vueApp.use(VMdEditor); // 導入 Vue
  nuxtApp.vueApp.use(VMdPreview);
});
