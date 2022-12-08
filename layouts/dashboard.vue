<template>
  <div class="min-h-screen bg-gray-100 text-c-gray-800">
    <header-dashboard />
    <main class="min-h-[680px] pt-6 pb-10">
      <slot></slot>
    </main>
    <footer-default />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
