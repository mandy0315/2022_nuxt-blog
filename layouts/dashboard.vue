<script setup>
useHead({
  bodyAttrs: {
    class: 'c-body-dashboard'
  }
});
</script>
<template>
  <div>
    <header-dashboard />
    <main class="min-h-[80vh] w-full">
      <slot></slot>
      <modals-container />
    </main>
    <footer-default />
  </div>
</template>
