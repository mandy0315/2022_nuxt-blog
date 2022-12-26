<template>
  <div class="text-c-gray-800">
    <h1 class="pb-2 text-3xl font-bold">{{ title }}</h1>
    <div class="flex justify-between">
      <div v-if="tags.length > 0" class="-ml-1">
        <span v-for="item in tags" :key="item">
          <the-tag :name="item" :hasLinks="hasLinks" class="inline-block" />
        </span>
      </div>
      <div class="self-end text-sm text-c-brown-600">
        <Icon icon="ic:baseline-date-range" class="mr-1 inline-block text-base" />
        <span class="align-middle">
          {{ dateFormat(update_time) }}
        </span>
      </div>
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
  tags: {
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
  },
  hasLinks: {
    type: Boolean,
    default: false
  }
});

const { dateFormat } = useDateTime();
</script>

<style lang="scss" scoped></style>
