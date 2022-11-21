// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  '@': '/<rootDir>', // 別名
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: ''
  },
  css: ['@/assets/style/base.scss'],
  runtimeConfig: {}, // 環境變數
  imports: {
    dirs: [
      // 掃描整個 composables 目錄下的檔案
      'composables/**'
    ]
  }
});
