// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  '@': '/<rootDir>', // 別名
  modules: ['@nuxtjs/tailwindcss'],
  css: ['@/assets/style/base.scss']
});
