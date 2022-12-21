<template>
  <div class="relative w-48">
    <div
      ref="container_el"
      class="relative cursor-pointer rounded border border-solid border-c-gray-200 py-1 pl-2 text-c-gray-400"
      @click="toggleList"
    >
      <Icon icon="fluent:arrow-sort-20-filled" class="item mr-1 inline-block" /><span class="mr-2 align-middle"
        >時間:</span
      >
      <span class="inline-block align-middle font-bold text-c-gray-800">{{ sortListMap.get(selectedSort) }}</span>
      <i class="pointer-events-none absolute right-0 top-1">
        <Icon v-if="isOpen" icon="material-symbols:keyboard-arrow-up" class="inline-block text-xl" />
        <Icon v-else icon="material-symbols:keyboard-arrow-down" class="inline-block text-xl" />
      </i>
    </div>

    <ul v-if="isOpen" class="absolute mt-1 w-full rounded border border-c-gray-100 bg-white py-2 shadow-lg">
      <li
        v-for="key in sortListByKeys"
        :key="key"
        class="cursor-pointer px-3 py-1 text-left text-lg text-c-gray-600"
        :class="{ 'bg-c-gray-100': selectedSort === key }"
        @click="selectedSort = key"
      >
        {{ sortListMap.get(key) }}
      </li>
    </ul>
  </div>
</template>
<script setup>
const { toggleList, isOpen, setContainer } = useToggle();

const emit = defineEmits(['update:sort']);
const props = defineProps({
  sort: {
    type: Number,
    default: 0
  }
});

const container_el = ref(null);
onMounted(() => {
  setContainer(container_el.value);
});

const sortListMap = new Map([
  [0, '新 → 舊'],
  [1, '舊 → 新']
]);
const sortListByKeys = computed(() => {
  const keys = [];
  for (let val of sortListMap.keys()) {
    keys.push(val);
  }
  return keys;
});

const selectedSort = computed({
  get: () => props.sort,
  set: val => emit('update:sort', val)
});
</script>
