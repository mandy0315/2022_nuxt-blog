<script setup></script>
<template>
  <div
    class="absolute top-0 left-0 h-full w-full overflow-y-auto bg-white text-c-black-200 dark:bg-c-bg-dark dark:text-c-gray-200"
  >
    <header-default />
    <main class="min-h-[80vh] w-full">
      <slot />
    </main>
    <footer-default />
  </div>
</template>
