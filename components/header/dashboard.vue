<template>
  <header>
    <header-top-nav />
    <div class="w-full bg-c-brown-800 text-white shadow">
      <div class="c-container flex items-center text-sm text-white">
        <nuxt-link to="/dashboard" class="flex items-center">
          <div class="mr-2 inline-block h-10 w-10 align-middle">
            <img class="border-soild border-2 border-c-brown-800" src="/static/images/logo.svg" alt="logo" />
          </div>
          <span class="text-base">{{ config.public.WEBSITE_TITLE }}</span>
        </nuxt-link>
        <div class="ml-auto">
          <button @click.prevent="userLogout">登出</button>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { signOut } from 'firebase/auth';

const config = useRuntimeConfig();

const clearAccessTokenBySession = () => {
  const accessToken = useCookie('access_token');

  return new Promise(async (resolve, reject) => {
    const { data, error } = await useFetch('/api/firebase/member/sessionLogout', {
      method: 'post',
      body: { accessToken: accessToken.value },
      initialCache: false
    });
    if (data.value) {
      resolve(data.value?.status);
    } else {
      reject(error.value);
    }
  });
};

const userLogout = async () => {
  const { auth } = useFirebaseClient();
  try {
    await signOut(auth);
    const status = await clearAccessTokenBySession();
    if (status === 'success') {
      return navigateTo('/login');
    }
  } catch (error) {
    console.log('登出有誤', error);
  }
};
</script>
