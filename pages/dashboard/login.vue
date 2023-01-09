<template>
  <form class="mx-auto max-w-[320px] pt-4">
    <h1 class="text-2xl font-bold text-c-brown-600">Hello ~ 歡迎登入</h1>
    <div>
      <form-fill-input v-model:value="accountFill" title="帳號" placeholder="請輸入信箱" />
      <p v-if="errors['account']" class="pt-1 text-sm text-red-600">{{ errors['account'] }}</p>
    </div>
    <div>
      <form-fill-input v-model:value="passwordFill" title="密碼" placeholder="請輸入密碼" />
      <p v-if="errors['password']" class="pt-1 text-sm text-red-600">{{ errors['password'] }}</p>
    </div>

    <button @click.prevent="handleSubmit" class="c-rounded-button c-rounded-button-brown my-4 w-full rounded-sm">
      登入
    </button>
  </form>
</template>

<script setup>
useHead({ title: '會員登入' });
definePageMeta({
  layout: false
});

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
      { required: true, errorMsg: '必填請輸入信箱' },
      { validate: val => val.length >= 8, errorMsg: '您輸入的密碼至少含 8 個字' }
    ]
  }
});

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

const handleSubmit = () => {
  const { isError } = checkAllError();
  if (isError) return false;
  console.log('yes');
};
</script>
