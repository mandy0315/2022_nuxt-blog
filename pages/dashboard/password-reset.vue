<template>
  <div class="mx-auto max-w-[320px] pt-4">
    <template v-if="!isSendFinish">
      <div class="mb-4">
        <h1 class="pb-2 text-2xl font-bold text-c-brown-600">忘記密碼 ?!</h1>
        <p class="text-sm text-c-gray-800">輸入信箱寄出後，你的信箱將會收到一封信，點開連結後即可重設你的密碼。</p>
        <p class="text-xs text-c-brown-600">(注意：信件可能會在垃圾信件中)</p>
      </div>
      <div v-if="isSendEmailFailed" class="bg-c-yellow-200/40 px-4 py-2">
        <h2 class="text-lg">寄出失敗！</h2>
        <p v-if="isShowOnlyMemberMsg">目前一個帳戶可使用</p>
        <p v-else>請檢查信箱是否有錯誤</p>
      </div>
      <div class="mb-4">
        <form-fill-input v-model:value="emailFill" placeholder="請輸入信箱" inputType="email" />
        <p v-if="errors['email']" class="pt-1 text-sm text-red-600">{{ errors['email'] }}</p>
      </div>

      <button @click="handleSend" class="c-rounded-button c-rounded-button-brown w-[50%] rounded text-center">
        寄出信件
      </button>
    </template>
    <template v-else>
      <div class="mb-6">
        <h1 class="pb-2 text-2xl font-bold text-c-brown-600">寄出成功！</h1>
        <p class="text-sm text-c-gray-800">請到信箱收信，點開連結後即可重設你的密碼。</p>
        <p class="text-xs text-c-brown-600">(注意：信件可能會在垃圾信件中)</p>
      </div>
      <nuxt-link to="/dashboard/login" class="c-rounded-button c-rounded-button-brown w-full rounded text-center"
        >回到登入頁</nuxt-link
      >
    </template>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
});

const isSendEmailFailed = useState('isSendEmailFailed', () => false);
const isSendFinish = useState('isSendFinish', () => false);
const isShowOnlyMemberMsg = useState('showOnlyMemberMsg', () => false);

const { values, errors, checkError, checkAllError } = useForm({
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

const sendPasswordResetEmail = async () => {
  const result = {
    isSend: false,
    error: ''
  };
  const info = { ...values };
  const { data, error } = await useFetch('/api/firebase/member/passwordReset', {
    method: 'post',
    body: info,
    initialCache: false
  });
  if (data.value) {
    console.log(data.value.message);
    result.isSend = !!data.value.message;
  } else {
    result.error = error.value.data;
  }
  return result;
};

const handleSend = async () => {
  isSendEmailFailed.value = false;
  isShowOnlyMemberMsg.value = false;

  // 驗證錯誤
  const { isError } = checkAllError();
  if (isError) return false;
  // 判斷唯一會員
  const config = useRuntimeConfig();
  if (values.email !== config.public.WEBSITE_ONlY_MEMBER) {
    isSendEmailFailed.value = true;
    isShowOnlyMemberMsg.value = true;
  }
  // 寄出信件
  const { isSend, error } = await sendPasswordResetEmail();
  if (isSend) {
    isSendFinish.value = true;
  } else {
    isSendEmailFailed.value = error.statusCode === 400; // 多組帳號使用
    return false;
  }
};
</script>
