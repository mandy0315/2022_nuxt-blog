<template>
  <div>
    <app-build />
    <client-only>
      <p>{{ title }}</p>
    </client-only>
    <button @click.prevent="changeTitle()">修改title</button>
    <Icon name="uil:github" />
    <input type="text" class="form-input" placeholder="請輸入" />
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

const $mainStore = useMainStore();
const { title } = storeToRefs($mainStore);
const { changeTitle } = $mainStore;
console.log('test');
</script>

<style lang="scss" scoped></style>
