<script setup>
const $route = useRoute();

const tagNameToUpperCase = computed(() => $route.params.name.replace(/^./, $route.params.name[0].toUpperCase()));
</script>
<template>
  <h1 class="my-10 text-center text-4xl font-bold">{{ tagNameToUpperCase }}</h1>

  <NuxtLayout name="aside"></NuxtLayout>
</template>
