<template>
  <div class="mx-auto max-w-[320px] pt-4">
    <h1 class="text-2xl font-bold text-c-brown-600">Hello ~ 歡迎登入</h1>
    <div v-if="isLoginfailed" class="bg-c-yellow-200/40 px-4 py-2">
      <h2 class="text-lg">登入失敗！</h2>
      <p>請檢查帳號與密碼是否有錯誤</p>
    </div>
    <div>
      <form-fill-input v-model:value="accountFill" title="帳號" placeholder="請輸入信箱" />
      <p v-if="errors['account']" class="pt-1 text-sm text-red-600">{{ errors['account'] }}</p>
    </div>
    <div>
      <form-fill-input v-model:value="passwordFill" title="密碼" placeholder="請輸入密碼" />
      <p v-if="errors['password']" class="pt-1 text-sm text-red-600">{{ errors['password'] }}</p>
    </div>

    <div @click="handleSignIn" class="c-rounded-button c-rounded-button-brown my-4 w-full rounded-sm text-center">
      登入
    </div>

    <!-- <button @click.prevent="handleResetPassword">忘記密碼</button> -->
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/index';
import { computed } from 'vue';
useHead({ title: '會員登入' });
definePageMeta({
  layout: false
});

const $mainStore = useMainStore();

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

const getUidBySignIn = async () => {
  const result = {
    uid: '',
    error: ''
  };
  const info = { ...values };
  const { data, error } = await useFetch('/api/firebase/member/signIn', {
    method: 'post',
    body: info,
    initialCache: false
  });
  if (data.value) {
    result.uid = data.value.data?.memberId;
  } else {
    result.error = error.value.data;
  }
  return result;
};

const isLoginfailed = useState('isLoginfailed', () => false);
// TODO handleSignIn未完
const handleSignIn = async () => {
  // 驗證錯誤
  const { isError } = checkAllError();
  if (isError) return false;
  // 登入取得 uid
  const { uid, error } = await getUidBySignIn();
  if (!uid) {
    isLoginfailed.value = error.statusCode === 400;
    return false;
  }
  // // 更新會員資訊
  // $mainStore.updateMemberInfo('uid', uid);
};

// const handleResetPassword = async () => {
//   const { data } = await useFetch('/api/firebase/test', {
//     method: 'post',
//     initialCache: false
//   });
// };
</script>
