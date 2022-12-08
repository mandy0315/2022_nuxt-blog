// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  '@': '/<rootDir>', // 別名
  app: {
    head: {
      meta: [
        {
          name: 'description',
          content: '網站說明'
        },
        {
          name: 'author',
          content: 'Mandy'
        },
        {
          name: 'copyright',
          content: '2022.mandy_生活&技術筆記'
        }
      ],
      link: [
        {
          rel: 'shortcut icon',
          href: '/static/images/logo.ico'
        }
      ]
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['@/assets/style/base.scss'],
  runtimeConfig: {}, // 環境變數
  imports: {
    dirs: [
      // 掃描整個目錄下的檔案
      'composables/**',
      'utils/**'
    ]
  }
});
