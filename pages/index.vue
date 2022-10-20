<template>
  <div class="bg-white py-24">
    <client-only>
      <p>{{ title }}</p>
    </client-only>
    <button @click.prevent="changeTitle()">修改title</button>
    <p>{{ count }}</p>
    <Icon name="uil:github" />
    <input type="text" class="form-input" placeholder="請輸入" />

    <pre>{{ serverData }}</pre>

    <p class="text-center">theme.darkMode:{{ theme.darkMode }}</p>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/index';
import { storeToRefs } from 'pinia';

const $mainStore = useMainStore();
const { title } = storeToRefs($mainStore);
const { changeTitle } = $mainStore;

const count = useCount();

const { data: serverData } = useFetch('/api/animal');
useFetch('/api/auth', {
  method: 'post',
  body: {
    email: 'windy@gamil.com',
    password: 12356
  }
});

const appConfig = useAppConfig();
const { theme } = appConfig;
</script>

<style lang="scss" scoped></style>
