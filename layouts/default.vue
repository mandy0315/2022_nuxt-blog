<template>
  <header-default class="-mb-14 box-border h-14" />
  <main class="min-h-full pt-14 pb-10">
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
  <footer-default class="-mt-10 box-border h-10" />
</template>
<script setup></script>

<style lang="scss" scoped></style>
