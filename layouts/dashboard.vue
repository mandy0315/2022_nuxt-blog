<template>
  <div class="min-h-screen bg-gray-100">
    <header-dashboard />
    <slot />
    <footer-default />
  </div>
</template>

<script setup>
useHead({
  titleTemplate: title => {
    return title ? `${title} - Mandy 部落格後台` : 'Mandy 部落格後台';
  }
});
</script>

<style lang="scss" scoped></style>
