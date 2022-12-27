<template>
  <div class="flex">
    <article class="mr-4 grow text-c-gray-800">
      <h1 :id="`#${title}`" class="c-title pb-3">{{ title }}</h1>
      <section class="mr-2 flex items-center">
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
      </section>
      <!-- image -->
      <section v-if="coverPicture.length > 0" class="block max-w-xl py-4">
        <post-image :link="coverPicture[0].link" :title="coverPicture[0].name" />
      </section>
      <!-- content -->
      <section class="pt-8">
        <v-md-preview class="preview-custom" :text="content" />
      </section>
    </article>
    <div v-if="hasAnchors" class="w-60">
      文章索引
      <div>
        <a :href="`#${title}`">{{ title }}</a>
      </div>
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
  coverPicture: {
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
  },
  hasAnchors: {
    type: Boolean,
    default: false
  }
});

const { dateFormat } = useDateTime();
</script>
