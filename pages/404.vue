<template>
  <main class="c-container flex flex-col items-center py-20">
    <h1
      class="pb-4 text-6xl font-bold after:mx-auto after:mt-4 after:block after:h-1 after:w-10 after:bg-c-orange-800 after:content-['']"
    >
      404
    </h1>
    <p class="mb-6 text-xl font-medium">找不到此頁面</p>
    <button
      class="c-rounded-button c-rounded-button-orange dark:c-rounded-button-orange w-1/4 rounded"
      @click.prevent="handleBackHome"
    >
      回到首頁
    </button>
  </main>
</template>

<script setup>
useHead({ title: '404' });
definePageMeta({
  layout: false,
  middleware: [
    (to, form) => {
      to.meta.layout = /^\/dashboard/g.test(to.path) ? 'dashboard' : 'default';
    }
  ]
});
const route = useRoute();
const router = useRouter();

const handleBackHome = () => {
  router.push({ path: /^\/[dashboard]{1}/g.test(route.path) ? '/dashboard' : '/' });
};
</script>

<style lang="scss" scoped></style>
