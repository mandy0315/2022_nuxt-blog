<template>
  <div class="bg-c-brown-900 text-c-brown-900">
    <nav class="c-container flex h-6 items-center text-sm text-white">
      <div>
        <Icon icon="ic:baseline-home" class="inline-block text-lg" />
        <nuxt-link
          to="/"
          class="bordre-solid border-r border-c-gray-400/40 px-2 hover:text-c-yellow-200"
          :class="{ 'text-c-yellow-200': !isDashboardPath }"
          >前台</nuxt-link
        >
        <nuxt-link
          to="/dashboard"
          class="px-2 hover:text-c-yellow-200"
          :class="{ 'text-c-yellow-200': isDashboardPath }"
          >後台</nuxt-link
        >
      </div>
      <div class="ml-auto">
        <a href="#" class="mx-1"
          ><Icon icon="mingcute:github-fill" class="inline-block text-lg" /><span class="pl-1">GitHub</span></a
        >
        <a href="#" class="mx-1"
          ><Icon icon="ri:facebook-fill" class="inline-block text-lg" /><span class="pl-1">Facebook</span></a
        >
      </div>
    </nav>
  </div>
</template>

<script setup>
const $route = useRoute();
const isDashboardPath = computed(() => /^\/dashboard/g.test($route.path));
</script>
