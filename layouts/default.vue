<script setup>
useHead({
  bodyAttrs: {
    class: 'c-body'
  }
});
</script>
<template>
  <div>
    <header-default />
    <main class="min-h-[80vh] w-full">
      <slot />
    </main>
    <footer-default />
  </div>
</template>
