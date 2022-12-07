<template>
  <div class="text-c-gray-800">
    <h1 class="text-3xl text-c-brown-800">{{ title }}</h1>
    <div class="pt-3 text-sm">
      <span class="pr-3"
        ><Icon icon="ic:outline-access-time" class="mr-1 inline-block" />{{ dateFormat(update_time) }}</span
      >
    </div>
    <div v-if="categories.length > 0" class="pt-3">
      <span v-for="item in categories" :key="item" class="mt-4">
        <the-tag :name="item" :hasLink="true" :link="`/categories/${item.toLowerCase()}`" />
      </span>
    </div>
    <div class="pt-8">
      <v-md-preview class="preview-custom" :text="content" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '標題'
  },
  categories: {
    type: Array,
    default: () => []
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
const postContent = ref('');
postContent.value = props.content;
</script>

<style lang="scss" scoped></style>
