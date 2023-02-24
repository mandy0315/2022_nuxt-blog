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
        <template v-if="tags.length > 0">
          <ul v-for="tag in tags" :key="tag">
            <li>
              <nuxt-link v-if="hasTagLinks" :to="`/tag/${tag}`" class="c-round-btn c-round-btn-default">{{
                firstWordToUpperCase(tag)
              }}</nuxt-link>
              <span
                v-else
                class="c-round-btn c-round-btn-default cursor-default hover:bg-c-gray-100 hover:text-c-black-200"
                >{{ firstWordToUpperCase(tag) }}</span
              >
            </li>
          </ul>
        </template>
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
const { firstWordToUpperCase } = useFormat();

const postContentRef = useState('postContentRef', () => ref(null));
</script>
