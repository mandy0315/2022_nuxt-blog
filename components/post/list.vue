<template>
  <div class="flex w-full items-center">
    <div class="flex-1 pr-4">
      <component
        :is="hasLinks ? 'a' : 'h3'"
        class="block pb-2 text-2xl font-bold text-c-brown-600"
        :class="{ 'hover:underline': hasLinks }"
        >{{ title }}</component
      >
      <p class="line-clamp-2">{{ summary }}</p>
      <div class="mr-2 flex items-center pt-6">
        <div class="inline-block self-center border-r border-solid border-c-gray-400 pr-3 text-sm text-c-gray-800">
          <Icon icon="ic:baseline-date-range" class="mr-1 inline-block text-base" />
          <span class="align-middle">
            {{ dateFormat(update_time) }}
          </span>
        </div>

        <div v-if="tags.length > 0" class="pl-3">
          <span v-for="item in tags" :key="item">
            <the-tag :name="item" :hasLinks="hasLinks" :link="`/tags/${item.toLowerCase()}`" class="inline-block" />
          </span>
        </div>
      </div>
    </div>
    <post-image
      v-if="coverPicture.length > 0"
      class="h-[125px] w-[215px]"
      :link="coverPicture[0].link"
      :title="coverPicture[0].name"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '標題'
  },
  coverPicture: {
    type: Array,
    default: []
  },
  tags: {
    type: Array,
    default: []
  },
  summary: {
    type: String,
    default: '摘要'
  },
  content: {
    type: String,
    default: '內容'
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
