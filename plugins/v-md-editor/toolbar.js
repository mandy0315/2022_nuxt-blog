export const toolbarConfig = {
  leftToolbar: 'h bold italic strikethrough quote | ul ol table hr | link image emoji code codepen | clear',
  rightToolbar: 'preview sync-scroll'
};

export const toolbarCustom = {
  codepen: {
    title: 'codepen',
    icon: 'v-md-icon-codepen',
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
  }
};
