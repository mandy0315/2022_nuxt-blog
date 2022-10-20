<template>
  <div>
    <header class="w-full bg-red-200 p-2">header</header>
    <slot />
    <footer class="w-full bg-red-200 p-2">footer</footer>
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
