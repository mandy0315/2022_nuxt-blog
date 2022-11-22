import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// 語言切換
import enUS from '@kangc/v-md-editor/lib/lang/en-US';
import hljs from './highlight';

// markdownIt 插件
import markdownItPlayground from 'markdown-it-playground';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

// props-toolbar 配置與自訂
import { toolbarConfig, toolbarCustom } from './toolbar';

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

  // 套件擴充插件
  VMdEditor.use(createEmojiPlugin());
  VMdEditor.use(createCopyCodePlugin());

  nuxtApp.vueApp.use(VMdEditor); // 導入 Vue

  return {
    provide: {
      toolbarConfig: toolbarConfig,
      toolbarCustom: toolbarCustom
    }
  };
});
