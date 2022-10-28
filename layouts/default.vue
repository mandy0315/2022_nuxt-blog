<template>
  <div class="min-h-screen bg-gray-50 text-c-gray-800 dark:bg-c-gray-800 dark:text-c-gray-400">
    <app-header />
    <main class="c-container px-4 pt-6 pb-20 lg:px-0">
      <slot />
    </main>
    <app-footer class="dark:text-c-gray-400" />
  </div>
</template>
<script setup>
useHead({
  titleTemplate: title => {
    return title ? `${title} - Mandy 部落格` : 'Mandy 部落格';
  }
});
</script>

<style lang="scss" scoped></style>
