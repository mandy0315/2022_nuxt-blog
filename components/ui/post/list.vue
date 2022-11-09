<template>
  <div class="flex items-center">
    <div class="mx-4">
      <h3 class="pb-2 text-2xl text-c-orange-800 group-hover:underline">{{ title }}</h3>
      <div class="pb-2 text-sm">
        <span class="pr-3"
          ><Icon icon="ic:outline-access-time" class="mr-1 inline-block" />{{ dateFormat(update_time) }}</span
        >
      </div>
      <p class="line-clamp-3">
        {{ postContent }}
      </p>
      <template v-if="category.length > 0">
        <div v-for="item in category" :key="item">
          <ui-tag :name="item" class="mt-1 -ml-1" />
        </div>
      </template>
    </div>

    <!-- <ui-post-image class="w-[230px]" /> -->
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '標題'
  },
  category: {
    type: Array,
    default: []
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
