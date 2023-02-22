<template>
  <div ref="postContent_el">
    <!-- title -->
    <div class="pb-10">
      <h1 :id="`#${title}`" class="c-title pb-3">{{ title }}</h1>
      <div class="mr-2 flex items-center">
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
          <span v-for="item in tags" :key="item">
            <the-tag :name="item" :hasLinks="hasTagLinks" class="inline-block" />
          </span>
        </div>
      </div>
    </div>

    <div class="flex">
      <!-- content -->
      <v-md-preview ref="postContentRef" class="preview-custom w-full grow" :text="content" />
      <!-- toc -->
      <post-content-toc v-if="hasToc" />
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
  hasTagLinks: {
    type: Boolean,
    default: false
  },
  hasToc: {
    type: Boolean,
    default: false
  }
});

const { dateFormat } = useDateTime();
const postContentRef = useState('postContentRef', () => ref(null));
</script>
