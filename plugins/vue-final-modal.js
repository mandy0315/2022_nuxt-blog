import { VueFinalModal, ModalsContainer } from 'vue-final-modal';
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('VueFinalModal', VueFinalModal);
  nuxtApp.vueApp.component('ModalsContainer', ModalsContainer);
});
