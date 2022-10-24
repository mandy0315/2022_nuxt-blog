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
            <h2 class="pb-2 text-lg text-c-gray-800">文章標題</h2>
            <div class="pb-2 text-sm">
              <span class="inline-block pr-2"><Icon icon="ic:outline-access-time" class="mr-1" />2022/10/23</span>
              <span><Icon icon="material-symbols:folder-open-outline" class="mr-1 inline-block" />Nuxt</span>
            </div>
            <p class="line-clamp-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae inventore fugit expedita voluptatem ea
              blanditiis odit, facere, eos fuga nisi ratione rerum maxime. Blanditiis nemo aliquam vel eligendi quod
              quisquam, itaque hic culpa debitis iure minima quasi dicta perspiciatis eum odit! Suscipit asperiores
              dolores animi illo eveniet. Quos quis nemo repudiandae ipsum, excepturi, voluptatum labore harum ab
              similique modi possimus, earum nam? Magnam quo aperiam, voluptatibus itaque nihil incidunt doloribus neque
              accusamus maxime illum, ea nesciunt nisi est consequuntur unde maiores assumenda soluta iste aut culpa
              quod sunt? Facere rerum nulla molestias suscipit sit quae hic ipsum nesciunt blanditiis quibusdam!
            </p>
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

<script setup></script>

<style lang="scss" scoped></style>
