// highlightjs 程式碼解析
import hljs from 'highlight.js';
// 匯入解析語言
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('js', js);
hljs.registerLanguage('ts', ts);
hljs.registerLanguage('html', html);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);

export default hljs;
