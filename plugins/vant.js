import { Toast } from 'vant';
import 'vant/lib/index.css'; // 不兼容按需載入樣式

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Toast);
});
