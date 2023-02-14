<template>
  <footer class="border-soild border-t border-c-gray-200">
    <div class="c-container flex justify-between py-5">
      <p>Copyright © 2022-2023 {{ config.public.WEBSITE_TITLE }}</p>
      <div>
        <a href="#" class="mx-1"><Icon icon="mingcute:github-fill" class="inline-block text-lg" /></a>
        <a href="#" class="mx-1"><Icon icon="ri:facebook-fill" class="inline-block text-lg" /></a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const config = useRuntimeConfig();
</script>
