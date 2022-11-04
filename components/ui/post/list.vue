<template>
  <div class="flex items-center">
    <div class="w-3/4 pr-6">
      <h3 class="pb-2 text-xl text-c-orange-800">{{ title }}</h3>
      <div class="pb-2 text-sm">
        <span class="pr-3"
          ><Icon icon="ic:outline-access-time" class="mr-1 inline-block" />{{ dateFormat(update_time) }}</span
        >
        <span><Icon icon="material-symbols:folder-open-outline" class="mr-1 inline-block" />{{ category }}</span>
      </div>
      <p class="line-clamp-3">
        {{ postContent }}
      </p>
    </div>

    <ui-post-image class="w-[230px]" />
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
const { markdownToHtml } = useMarked();

const postContent = computed(() => {
  const html = markdownToHtml(props.content);
  const stripTagsToString = html.replace(/(<([^>]+)>)/gi, '');
  return stripTagsToString;
});
</script>

<style lang="scss" scoped></style>
