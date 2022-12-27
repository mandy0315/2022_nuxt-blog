<template>
  <div class="flex w-full items-center">
    <div class="flex-1 pr-4">
      <nuxt-link
        v-if="hasLinks"
        :to="`/post-${id}`"
        class="block cursor-pointer pb-2 text-2xl font-bold text-c-gray-800 hover:text-c-brown-600 hover:underline"
        >{{ title }}</nuxt-link
      >
      <h3 v-else class="pb-2 text-2xl font-bold text-c-gray-800">{{ title }}</h3>

      <p class="line-clamp-2">{{ summary }}</p>
      <div class="mr-2 flex items-center pt-6">
        <div class="inline-block self-center text-sm text-c-gray-400">
          <Icon icon="ic:baseline-date-range" class="mr-1 inline-block text-base" />
          <span class="align-middle">
            {{ dateFormat(update_time) }}
          </span>
        </div>

        <div
          v-if="tags.length > 0"
          class="pl-3 before:mr-2 before:inline-block before:h-5 before:w-[1px] before:bg-c-gray-400 before:align-middle before:content-['']"
        >
          <span v-for="item in tags" :key="item">
            <the-tag :name="item" :hasLinks="hasLinks" class="inline-block" />
          </span>
        </div>
      </div>
    </div>
    <section v-if="coverPicture.length > 0" class="w-60">
      <post-image class="rounded" :link="coverPicture[0].link" :title="coverPicture[0].name" />
    </section>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '標題'
  },
  id: {
    type: String,
    default: ''
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
