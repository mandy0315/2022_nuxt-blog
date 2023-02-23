<template>
  <div class="relative">
    <div
      ref="container_el"
      class="absolute top-0 right-0 z-10 cursor-pointer rounded-md border border-solid border-c-line-gray bg-white text-c-black-100 transition-all duration-300 ease-in-out"
      :class="isOpen ? 'min-h-[70px] min-w-[120px] border-none shadow-select-box' : 'min-h-[35px] min-w-[45px] '"
      @click="toggleList"
    >
      <div class="relative p-2">
        <p
          class="absolute top-2 left-2 font-bold text-c-black-200 transition-all duration-75 ease-in-out"
          :class="isOpen ? 'opacity-100 delay-100' : 'opacity-0'"
        >
          年份
        </p>
        <i class="flex items-center justify-end">
          <Icon :icon="icon" class="text-[20px]" />
          <i class="pointer-events-none align-middle text-[16px]">
            <Icon v-if="isOpen" icon="material-symbols:keyboard-arrow-up" />
            <Icon v-else icon="material-symbols:keyboard-arrow-down" />
          </i>
        </i>
      </div>

      <ul :class="isOpen ? 'h-full w-full opacity-100' : '-m-1 h-0 w-0 opacity-0'">
        <li
          v-for="i in selectList"
          :key="i"
          @click="selectedValue = i"
          class="m-1 rounded-md p-1 text-center hover:bg-c-gray-100/80"
          :class="selectedValue === i ? 'bg-c-gray-100/80 font-bold text-c-black-200' : 'text-c-gray-200'"
        >
          {{ i }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
const { toggleList, isOpen, setContainer } = useToggle();
const props = defineProps({
  selectList: {
    type: Array,
    required: true
  },
  value: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
});
const container_el = ref(null);
onMounted(() => {
  setContainer(container_el.value);
});

const emit = defineEmits(['update:value']);
const selectedValue = computed({
  get: () => props.value,
  set: val => emit('update:value', val)
});
</script>
