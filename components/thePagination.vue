<template>
  <div v-if="+totalPages > 0" class="relative flex select-none items-center justify-center">
    <span
      v-if="+totalPages > 1"
      class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
      :class="+currentPage <= 1 ? 'cursor-not-allowed bg-c-gray-200' : 'bg-c-brown-200'"
    >
      <Icon icon="ic:round-keyboard-arrow-left" class="text-2xl text-white" @click="setPagePrev" />
    </span>

    <ul class="mx-3 text-lg text-c-black-200">
      <li
        v-for="i in pagerEnd"
        :key="i"
        class="mx-1 inline-block h-8 w-8 cursor-pointer text-center hover:text-c-brown-200"
        :class="{ 'font-bold text-c-brown-200 underline': +currentPage === i + pagerAddAmount }"
        @click.prevent="setCurrentPage(i + pagerAddAmount)"
      >
        {{ i + pagerAddAmount }}
      </li>
    </ul>
    <span
      v-if="+totalPages > 1"
      class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
      :class="+currentPage >= +totalPages ? 'cursor-not-allowed bg-c-gray-200' : 'bg-c-brown-200'"
    >
      <Icon icon="ic:round-keyboard-arrow-right" class="text-2xl text-white" @click="setPageNext" />
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: [String, Number],
    required: true,
    default: 1
  },
  totalPages: {
    type: [String, Number],
    required: true,
    default: 1
  }
});
const pagerEnd = computed(() => (+props.totalPages <= 10 ? +props.totalPages : 10)); // 迴圈次數
const pagerAddAmount = computed(() => {
  const tmp = +props.totalPages <= 10 ? 0 : +props.currentPage + Math.ceil(10 / 2) - pagerEnd.value; // 中間值
  return tmp <= 0 ? 0 : +props.totalPages - (10 + tmp) < 0 ? +props.totalPages - 10 : tmp;
}); // 新增的頁數數字

const emit = defineEmits(['update:currentPage']);
const setCurrentPage = page => emit('update:currentPage', page);

const setPageNext = () => (+props.currentPage >= +props.totalPages ? false : setCurrentPage(+props.currentPage + 1));

const setPagePrev = () => (+props.currentPage <= 1 ? false : setCurrentPage(+props.currentPage - 1));
</script>
