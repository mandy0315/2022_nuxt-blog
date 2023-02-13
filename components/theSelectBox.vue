<template>
  <div
    ref="container_el"
    class="relative z-10 cursor-pointer rounded border border-solid border-c-gray-200 py-1 pl-2 text-c-gray-400"
    @click="toggleList"
  >
    <slot name="title"></slot>
    <i class="pointer-events-none">
      <Icon v-if="isOpen" icon="material-symbols:keyboard-arrow-up" class="inline-block text-xl" />
      <Icon v-else icon="material-symbols:keyboard-arrow-down" class="inline-block text-xl" />
    </i>

    <ul v-if="isOpen" class="absolute top-full right-0 mt-1 w-[120px] rounded border border-c-gray-200 bg-white py-1">
      <li
        v-for="i in selectList"
        :key="i"
        @click="selectedValue = i"
        class="hover:c-gray-100 cursor-pointer px-3 py-1 text-left text-c-gray-600"
        :class="{ 'bg-c-gray-100': selectedValue === i }"
      >
        {{ i }}
      </li>
    </ul>
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
