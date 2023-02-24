<template>
  <div class="flex w-full items-center">
    <div class="flex-1 pr-4">
      <nuxt-link
        v-if="hasLinks"
        :to="`/post/${id}`"
        class="block cursor-pointer pb-2 text-2xl font-bold text-c-black-200 hover:text-c-brown-200 hover:underline"
        >{{ title }}</nuxt-link
      >
      <h3 v-else class="pb-2 text-2xl font-bold text-c-black-200">{{ title }}</h3>

      <p class="line-clamp-2">{{ contentToSummary }}</p>
      <div class="mr-2 flex items-center pt-6">
        <div class="inline-block self-center text-sm text-c-gray-200">
          <Icon icon="ic:baseline-date-range" class="mr-1 inline-block text-base" />
          <span class="align-middle">
            {{ dateFormat(update_time) }}
          </span>
        </div>

        <div
          v-if="tags.length > 0"
          class="pl-3 before:mr-2 before:inline-block before:h-5 before:w-[1px] before:bg-c-gray-200 before:align-middle before:content-['']"
        >
          <span v-for="i in tags" :key="i">
            <nuxt-link :to="`/tag/${i}`" class="c-round-btn c-round-btn-default">{{
              firstWordToUpperCase(i)
            }}</nuxt-link>
          </span>
        </div>
      </div>
    </div>
    <section v-if="Object.keys(contentToCoverPicture).length > 0" class="w-60">
      <post-image class="rounded" :link="contentToCoverPicture.href" :title="contentToCoverPicture.name" />
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
  tags: {
    type: Array,
    default: []
  },
  content: {
    type: String,
    default: ''
  },
  update_time: {
    type: String,
    default: ''
  },
  hasLinks: {
    type: Boolean,
    default: false
  }
});
const { dateFormat } = useDateTime();
const { firstWordToUpperCase } = useFormat();

const { $convertTohtml } = useNuxtApp();

const contentToSummary = computed(() => {
  const markdownToHtml = $convertTohtml(props.content);
  let replaceHtml = markdownToHtml.replace(/<\/?.+?\/?>|{{{\/?.+?\/?}}}/g, '');
  replaceHtml.replace(/\s*/g, '');
  return replaceHtml;
});

const contentToCoverPicture = computed(() => {
  const markdownToHtml = $convertTohtml(props.content);
  const imageArray = markdownToHtml.match(/<img .+?\/?>/g);
  if (imageArray) {
    const attrs = imageArray[0].match(/"([^"]*)" /g);
    const obj = {
      href: attrs[0].replace(/"*/g, ''),
      name: attrs[1].replace(/"*/g, '')
    };
    return obj;
  }
  return {};
});
</script>
