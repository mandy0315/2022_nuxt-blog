<script setup>
const config = useRuntimeConfig();

useHead({
  titleTemplate: title => {
    return title ? `${title}-${config.public.WEBSITE_TITLE}` : config.public.WEBSITE_TITLE;
  }
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
