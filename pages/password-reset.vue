<template>
  <div class="mx-auto max-w-[320px] pt-4">
    <template v-if="isSendFinish">
      <div class="mb-6">
        <h1 class="pb-2 text-2xl font-bold text-c-brown-200">寄出成功！</h1>
        <p class="text-sm text-c-black-200">請到信箱收信，點開連結後即可重設你的密碼。</p>
        <p class="text-xs text-c-brown-200">(注意：信件可能會在垃圾信件中)</p>
      </div>
      <nuxt-link to="/login" class="c-btn c-btn-brown w-full rounded text-center">回到登入頁</nuxt-link>
    </template>
    <template v-else>
      <div class="mb-4">
        <h1 class="pb-2 text-2xl font-bold text-c-brown-200">忘記密碼 ?!</h1>
        <p class="text-sm text-c-black-200">輸入信箱寄出後，你的信箱將會收到一封信，點開連結後即可重設你的密碼。</p>
        <p class="text-xs text-c-brown-200">(注意：信件可能會在垃圾信件中)</p>
      </div>
      <div class="mb-4">
        <form-fill-input v-model:value="emailFill" placeholder="請輸入信箱" inputType="email" />
        <p v-if="errors['email']" class="pt-1 text-sm text-red-600">{{ errors['email'] }}</p>
        <p v-if="isSendEmailFailed" class="pt-1 text-sm text-red-600">請檢查信箱是否有錯誤</p>
      </div>

      <button @click="sendEmail" class="c-btn c-btn-brown w-[50%] rounded text-center">寄出信件</button>
    </template>
  </div>
</template>

<script setup>
import { sendPasswordResetEmail } from 'firebase/auth';

definePageMeta({
  layout: false
});

const { values, errors, checkError, checkAllError } = useFormVerify({
  initValues: {
    email: ''
  },
  validateRules: {
    email: [
      { required: true, errorMsg: '必填請輸入信箱' },
      { validate: val => /[\w._-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(val), errorMsg: '您輸入的信箱格式有誤' }
    ]
  }
});

const emailFill = computed({
  get: () => values.email,
  set: val => {
    values.email = val;
    checkError('email');
  }
});

const isSendEmailFailed = ref(false);
const isSendFinish = ref(false);
const sendEmail = async () => {
  isSendEmailFailed.value = false;

  const { isError } = checkAllError();
  if (isError) return false;

  // 判斷唯一會員
  const config = useRuntimeConfig();
  if (values.email !== config.public.WEBSITE_ONlY_MEMBER) {
    isSendEmailFailed.value = true;
    return false;
  }

  // 寄出信件
  const { auth } = useFirebaseClient();
  sendPasswordResetEmail(auth, values.email)
    .then(() => {
      isSendFinish.value = true;
    })
    .catch(error => {
      console.log(error.data);
    });
};
</script>
