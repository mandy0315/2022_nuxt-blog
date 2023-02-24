<script setup></script>
<template>
  <div
    class="absolute top-0 left-0 h-full w-full overflow-y-auto bg-c-bg-cream text-c-black-200 dark:bg-c-bg-dark dark:text-white/80"
  >
    <header-dashboard />
    <main class="min-h-[80vh] w-full">
      <slot></slot>
      <modals-container />
    </main>
    <footer-default />
  </div>
</template>
