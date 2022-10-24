<template>
  <div class="h-screen bg-gray-100">
    <dashboard-header />
    <slot />
    <app-footer />
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
