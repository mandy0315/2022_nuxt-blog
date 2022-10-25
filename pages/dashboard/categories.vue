<template>
  <main class="c-container pt-6 pb-10">
    <h1 class="c-dashboard-title pb-4">分類管理</h1>
    <div class="grid grid-cols-8 gap-4">
      <section class="col-span-5 rounded-md bg-white p-6">
        <table class="w-full">
          <thead class="bg-c-gray-800 text-left text-sm text-white">
            <tr>
              <th scope="row" class="w-3/12 py-2 px-4">名稱</th>
              <th scope="row" class="w-6/12 py-2 px-4">路徑</th>
              <th scope="row" class="w-3/12 py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-solid border-c-gray-400 text-base">
              <td scope="col" class="py-2 px-4 text-c-gray-600">
                <p class="text-c-gray-800">Nuxt</p>
              </td>
              <td class="py-2 px-4">
                <input
                  type="text"
                  value="/categories/nuxt"
                  class="form-input w-full rounded border-c-gray-400 !bg-gray-100 py-1"
                  disabled
                />
              </td>
              <td class="py-2 px-4"><button class="c-border-button c-border-button-red my-1 w-full">刪除</button></td>
            </tr>
          </tbody>
        </table>
      </section>
      <section class="col-span-3 rounded-md bg-white p-6">
        <h2 class="pb-4 text-xl font-medium">
          <Icon icon="ic:round-create-new-folder" class="mr-2 inline-block align-middle" />新增分類
        </h2>
        <form>
          <label class="block pb-4">
            <p class="pb-1 pr-4 text-base">名稱</p>
            <input type="text" class="form-input w-full rounded border-c-gray-400" placeholder="請輸入名稱" />
          </label>
          <label class="block pb-4">
            <p class="pb-1 pr-4 text-base">路徑</p>
            <input type="text" class="form-input w-full rounded border-c-gray-400" placeholder="請輸入路徑" />
          </label>
          <button class="c-rounded-button c-rounded-button-gray ml-auto block rounded">新增</button>
        </form>
      </section>
    </div>
  </main>
</template>

<script setup>
useHead({
  title: '分類管理'
});
definePageMeta({
  layout: 'dashboard'
});
</script>

<style lang="scss" scoped></style>
