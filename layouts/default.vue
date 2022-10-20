<template>
  <div>
    <header class="bg-red-200"><div class="c-container">header</div></header>
    <slot />
    <app-footer />
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
