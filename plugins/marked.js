import { marked } from 'marked'; // https://marked.js.org/#demo 解析 markdown
import DOMPurify from 'isomorphic-dompurify'; // 輸出防止 XXS 攻擊
import hljs from 'highlight.js';
import 'highlight.js/scss/atom-one-dark.scss';

export default defineNuxtPlugin(nuxtApp => {
  const rendererMD = new marked.Renderer();

  // https://marked.js.org/using_pro#renderer 調整元素
  rendererMD.heading = (text, level) => `<h${level} class="font-bold">${text}</h${level}>`;

  marked.setOptions({
    renderer: rendererMD,
    // https://highlightjs.org
    highlight: (code, lang) => {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  });

  return {
    provide: {
      markdownToHtml: markdownString => DOMPurify.sanitize(marked.parse(markdownString))
    }
  };
});
