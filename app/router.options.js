export default {
  // Vue Router 滾動行為 https://nuxt.com/docs/migration/component-options#scrolltotop
  scrollBehavior: (to, from, savedPosition) => {
    const reg = /^\/post-[\w]+$/g;
    const isPostContentPath = reg.test(to.path);
    if (isPostContentPath && to.hash) {
      return false; // nuxt3 { left: 0, top: 0 }
    }
  }
};
