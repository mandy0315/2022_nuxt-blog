<template>
  <div class="min-h-screen bg-gray-50 text-c-gray-800 dark:bg-c-gray-800 dark:text-c-gray-400">
    <header-default />
    <main class="c-container px-4 pt-6 pb-20 lg:px-0">
      <slot />
    </main>
    <footer-default class="dark:text-c-gray-400" />
  </div>
</template>
<script setup></script>

<style lang="scss" scoped></style>
