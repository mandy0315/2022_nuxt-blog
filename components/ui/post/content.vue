<template>
  <div class="text-c-gray-800">
    <div class="mb-4 py-4">
      <h3 class="pb-2 text-3xl text-c-orange-800">{{ title }}</h3>
      <div class="text-sm">
        <span class="pr-3"
          ><Icon icon="ic:outline-access-time" class="mr-1 inline-block" />{{ dateFormat(update_time) }}</span
        >
        <span><Icon icon="material-symbols:folder-open-outline" class="mr-1 inline-block" />{{ category }}</span>
      </div>
    </div>
    <ui-post-image class="mb-4" />
    <md-editor
      editor-id="my-editor"
      v-model="content"
      code-theme="github"
      preview-theme="github"
      class="!bg-transparent"
      :theme="$colorMode.value"
      previewOnly
    />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '標題'
  },
  category: {
    type: String,
    default: '分類名稱'
  },
  content: {
    type: String,
    default: '輸入內容'
  },
  update_time: {
    type: String,
    default: '2022/11/04'
  }
});

const { dateFormat } = useDateTime();
</script>

<style lang="scss" scoped></style>
