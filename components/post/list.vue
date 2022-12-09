<template>
  <div class="flex w-full items-center">
    <div class="mx-4 w-full">
      <component
        :is="hasLinks ? 'a' : 'h3'"
        class="block pb-2 text-2xl font-bold text-c-brown-800"
        :class="{ 'hover:underline': hasLinks }"
        >{{ title }}</component
      >
      <p class="line-clamp-2">{{ summary }}</p>
      <div class="flex justify-between pt-6">
        <div v-if="categories.length > 0" class="-ml-1">
          <span v-for="item in categories" :key="item">
            <the-tag
              :name="item"
              :hasLinks="hasLinks"
              :link="`/categories/${item.toLowerCase()}`"
              class="inline-block"
            />
          </span>
        </div>
        <div class="self-end text-sm text-c-brown-600">
          <Icon icon="ic:baseline-date-range" class="mr-1 inline-block text-base" />
          <span class="align-middle">
            {{ dateFormat(update_time) }}
          </span>
        </div>
      </div>
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
  categories: {
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
