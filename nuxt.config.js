// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  '@': '/<rootDir>', // 別名
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon'],
  css: ['@/assets/style/base.scss'],
  imports: {
    dirs: [
      // 掃描 composables 目錄頂層
      'composables',
      // 掃描深度一層的特定檔案
      'composables/*/index.{ts,js,mjs,mts}',
      // 掃描整個 composables 目錄下的檔案
      'composables/**'
    ]
  }
});
