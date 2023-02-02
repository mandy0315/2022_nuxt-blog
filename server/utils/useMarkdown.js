import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

export const markdownToTxt = content => {
  const markdownToHtml = md.render(content);
  let replaceHtml = markdownToHtml.replace(/<\/?.+?\/?>|{{{\/?.+?\/?}}}/g, '');
  replaceHtml.replace(/\s*/g, '');
  return replaceHtml;
};
