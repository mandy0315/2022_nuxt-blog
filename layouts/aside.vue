<script setup></script>

<template>
  <div class="c-container grid grid-cols-12 gap-10">
    <div class="col-span-9">
      <slot />
    </div>
    <asideDefault class="col-span-3" />
  </div>
</template>
