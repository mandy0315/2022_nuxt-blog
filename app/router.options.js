export default {
  // Vue Router 滾動行為 https://nuxt.com/docs/migration/component-options#scrolltotop
  scrollBehavior: (to, from, savedPosition) => {
    const reg = /^\/post-[\w]+$/g;
    const isPostContentPath = reg.test(to.path);
    if (isPostContentPath && to.hash) {
      return { left: 0, top: 0 }; // nuxt3
    }
  }
};
