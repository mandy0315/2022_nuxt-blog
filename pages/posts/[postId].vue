<template>
  <div>
    <ui-breadcrumb />
    <div class="border-soild mb-4 border-b border-c-gray-400 py-4">
      <h3 class="pb-2 text-2xl text-c-orange-800">文章標題</h3>
      <div class="text-sm">
        <span class="pr-3"><Icon icon="ic:outline-access-time" class="mr-1 inline-block" />2022/10/23 </span>
        <span><Icon icon="material-symbols:folder-open-outline" class="mr-1 inline-block" />Nuxt </span>
      </div>
    </div>
    <ui-post-image class="mb-4" />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, esse incidunt! Totam inventore voluptate,
      laborum quaerat in ratione. Obcaecati molestiae fugit unde quisquam ea error? Maiores, amet eligendi veritatis
      nemo maxime dicta tempora fugit aliquam delectus sed excepturi odio dolorum! Dicta corporis voluptatum id incidunt
      autem culpa debitis repellat, nisi dignissimos ab cumque quasi vitae consequatur eaque libero quisquam. A
      molestiae eligendi itaque dolor amet, ratione nostrum dolorum quo ipsam velit minima exercitationem aut rem,
      eveniet voluptate. Blanditiis, vero? Dolorum velit voluptate autem labore minus quo fugit reprehenderit laborum
      eius? Assumenda molestiae, consectetur laboriosam deleniti quaerat non sed dicta recusandae.
    </p>
  </div>
</template>

<script setup>
const route = useRoute();
useHead({
  title: route.params.postId
});
</script>

<style lang="scss" scoped></style>
