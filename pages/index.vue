<template>
  <div class="bg-white py-24">
    <client-only>
      <p>{{ title }}</p>
    </client-only>
    <button @click.prevent="changeTitle()">修改title</button>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

const $mainStore = useMainStore();
const { title } = storeToRefs($mainStore);
const { changeTitle } = $mainStore;
</script>

<style lang="scss" scoped></style>
