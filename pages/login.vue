<template>
  <div class="mx-auto max-w-[320px] pt-4">
    <div class="mb-4">
      <h1 class="pb-1 text-2xl font-bold text-c-brown-600">登入會員</h1>
      <p class="text-sm text-c-gray-800">沒有註冊頁喔～ 只有一個帳戶可使用！</p>
    </div>
    <div v-if="isLoginfailed" class="bg-c-yellow-200/40 px-4 py-2">
      <h2 class="text-lg">登入失敗！</h2>
      <p>請檢查帳號與密碼是否有錯誤</p>
    </div>
    <div class="mb-2">
      <form-fill-input v-model:value="accountFill" title="帳號" placeholder="請輸入信箱" inputType="email" />
      <p v-if="errors['account']" class="pt-1 text-sm text-red-600">{{ errors['account'] }}</p>
    </div>
    <div class="mb-4">
      <form-fill-input
        v-model:value="passwordFill"
        title="密碼"
        placeholder="請輸入密碼"
        :inputType="`${!isShowPasswordValue ? 'password' : 'text'}`"
      >
        <template #title-right>
          <nuxt-link to="/password-reset" class="c-text-button text-sm">忘記密碼</nuxt-link>
        </template>

        <span
          @click="isShowPasswordValue = !isShowPasswordValue"
          class="absolute top-1 right-2 cursor-pointer p-1 text-xl"
        >
          <template v-if="!isShowPasswordValue">
            <Icon icon="mdi:eye-outline" class="text-c-gray-600" />
          </template>
          <template v-else>
            <Icon icon="mdi:eye-off-outline" class="text-c-gray-600" />
          </template>
        </span>
      </form-fill-input>

      <p v-if="errors['password']" class="pt-1 text-sm text-red-600">{{ errors['password'] }}</p>
    </div>

    <div @click="handleUserLogin" class="c-rounded-button c-rounded-button-brown w-[50%] rounded text-center">登入</div>
  </div>
</template>

<script setup>
import { signInWithEmailAndPassword, signOut, inMemoryPersistence, setPersistence } from 'firebase/auth';

useHead({ title: '會員登入' });
definePageMeta({
  layout: false
});

const isShowPasswordValue = useState('isShowPasswordValue', () => false);

// 驗證
const { values, errors, checkError, checkAllError } = useForm({
  initValues: {
    account: '',
    password: ''
  },
  validateRules: {
    account: [
      { required: true, errorMsg: '必填請輸入信箱' },
      { validate: val => /[\w._-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(val), errorMsg: '您輸入的信箱格式有誤' }
    ],
    password: [
      { required: true, errorMsg: '必填請輸入密碼' },
      { validate: val => val.length >= 8, errorMsg: '您輸入的密碼至少含 8 個字' }
    ]
  }
});

// 欄位
const accountFill = computed({
  get: () => values.account,
  set: val => {
    values.account = val;
    checkError('account');
  }
});
const passwordFill = computed({
  get: () => values.password,
  set: val => {
    values.password = val;
    checkError('password');
  }
});

// 登入事件
const isLoginfailed = useState('isLoginfailed', () => false);

const saveAccessTokenToSession = async accessToken => {
  const { data, error } = await useFetch('/api/firebase/member/sessionLogin', {
    method: 'post',
    body: { accessToken },
    initialCache: false
  });
  if (error.value) {
    throw createError({ statusCode: error.value.data.statusCode, statusMessage: error.value.data.message });
  }
};

const handleUserLogin = async () => {
  isLoginfailed.value = false;

  const { isError } = checkAllError();
  if (isError) return false;

  // 判斷唯一會員
  const config = useRuntimeConfig();
  if (values.account !== config.public.WEBSITE_ONlY_MEMBER) {
    isLoginfailed.value = true;
    return false;
  }

  // firebase 登入
  let accessToken = '';
  const { auth } = useFirebaseClient();
  try {
    await setPersistence(auth, inMemoryPersistence); // 持久化

    const userCredential = await signInWithEmailAndPassword(auth, values.account, values.password);
    accessToken = userCredential.user.accessToken;

    await saveAccessTokenToSession(accessToken);
    isLoginfailed.value = false;
    return navigateTo('/dashboard');
  } catch (error) {
    if (accessToken) {
      signOut(auth).then(() => {
        console.log('有錯誤！登出');
      });
    }
    isLoginfailed.value = true;
  }
};
</script>
