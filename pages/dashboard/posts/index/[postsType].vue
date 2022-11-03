<template>
  <section class="w-full rounded-b-md rounded-tr-md bg-white p-6">
    <table>
      <thead class="bg-c-gray-800 text-white">
        <tr>
          <th scope="row" class="w-5/6 py-2">文章資訊</th>
          <th scope="row" class="w-1/6 py-2">管理</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-solid border-c-gray-400">
          <td scope="col" class="p-4 text-c-gray-600">
            <ui-post-item />
          </td>
          <td class="p-4">
            <button class="c-border-button c-border-button-gray my-1 w-full">編輯</button>
            <button class="c-border-button c-border-button-gray my-1 w-full">預覽</button>
            <button class="c-border-button c-border-button-red my-1 w-full">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: [
    (to, form) => {
      if (!['public', 'draft'].includes(to.params.postsType)) {
        return navigateTo('/dashboard/posts/public');
      }
    }
  ]
});
</script>

<style lang="scss" scoped></style>
