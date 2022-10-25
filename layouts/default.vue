<template>
  <div class="h-screen bg-white text-c-gray-800 dark:bg-c-gray-800 dark:text-c-gray-400">
    <app-header />
    <slot />
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
