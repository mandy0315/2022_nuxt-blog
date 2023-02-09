<template>
  <header-default />
  <main class="min-h-[680px] py-10">
    <slot name="title"></slot>

    <div class="c-container grid grid-cols-12 gap-10">
      <div class="col-span-9">
        <slot />
      </div>
      <div class="col-span-3">
        <slot name="aside"><aside-default /></slot>
      </div>
    </div>
  </main>
  <footer-default />
</template>
<script setup></script>

<style lang="scss" scoped></style>
