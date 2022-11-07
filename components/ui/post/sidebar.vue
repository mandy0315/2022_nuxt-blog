<template>
  <aside
    class="ml-6 w-full max-w-[300px] rounded-md bg-white p-6 text-c-gray-800 shadow-md dark:bg-c-gray-600 dark:text-c-gray-400"
  >
    <div>
      <p class="text-lg font-medium">
        <Icon icon="material-symbols:folder-open-rounded" class="mr-2 inline-block" />文章分類
      </p>
      <ul class="mt-2 px-2">
        <li>
          <nuxt-link v-for="num in 2" class="flex h-[30px]"
            ><span class="c-text-button inline-block rounded-l bg-gray-100 px-2">Nuxt</span
            ><span class="inline-block rounded-r bg-c-gray-400 pl-1.5 pr-2 text-sm">1</span></nuxt-link
          >
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup></script>

<style lang="scss" scoped></style>
