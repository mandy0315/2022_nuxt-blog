<template>
  <header class="inline-block w-full bg-c-brown-800 text-white shadow">
    <div class="c-container flex items-center py-2">
      <nuxt-link to="/dashboard" class="flex items-center">
        <div class="mr-2 inline-block w-7 align-middle">
          <img src="/static/images/logo.svg" alt="logo" />
        </div>
        <span>Mandy 紀錄後台</span>
      </nuxt-link>
      <nav class="pl-6">
        <nuxt-link to="/" class="text-sm text-c-yellow-200">回到前台</nuxt-link>
      </nav>
      <div class="ml-auto">
        <span class="pr-2">mandy 您好</span>
        <button class="text-sm">登出</button>
      </div>
    </div>
  </header>
</template>
