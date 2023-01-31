<template>
  <header>
    <div class="w-full bg-c-brown-800 text-white shadow">
      <div class="c-container flex items-center text-sm text-white">
        <nuxt-link to="/dashboard/posts-public" class="flex items-center">
          <div class="mr-2 inline-block h-10 w-10 align-middle">
            <img class="border-soild border-2 border-c-brown-800" src="/static/images/logo.svg" alt="logo" />
          </div>
          <span class="text-base">{{ config.public.WEBSITE_TITLE }}</span>
        </nuxt-link>
        <div class="ml-auto flex items-center">
          <template v-if="isLogin">
            <p class="pr-2 text-base">{{ memberInfo.name }}</p>
            <div class="h-10 w-10 overflow-hidden rounded-full">
              <img :src="memberInfo.photoURL" alt="" />
            </div>
            <button @click.prevent="handleUserLogout()">登出</button>
          </template>
          <template v-else>
            <nuxt-link to="/login">登入</nuxt-link>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { useMainStore } from '@/stores/index';

const config = useRuntimeConfig();
const $mainStore = useMainStore();

const { handleUserLogout } = $mainStore;
const isLogin = computed(() => $mainStore.isLogin);
const memberInfo = computed(() => $mainStore.memberInfo);
</script>
