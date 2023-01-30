<template>
  <header>
    <header-top-nav />
    <div class="w-full bg-c-brown-800 text-white shadow">
      <div class="c-container flex items-center text-sm text-white">
        <nuxt-link to="/dashboard/posts-public" class="flex items-center">
          <div class="mr-2 inline-block h-10 w-10 align-middle">
            <img class="border-soild border-2 border-c-brown-800" src="/static/images/logo.svg" alt="logo" />
          </div>
          <span class="text-base">{{ config.public.WEBSITE_TITLE }}</span>
        </nuxt-link>
        <div class="ml-auto">
          <button @click.prevent="handleUserLogout()">登出</button>
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
</script>
