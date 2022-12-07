<template>
  <label>
    <p class="pb-1 pr-4 text-lg">{{ title }}</p>
    <textarea
      ref="textareaEl"
      @input="handleAutoGrow"
      v-model="text"
      :placeholder="placeholder"
      class="c-form w-full resize-none rounded"
    ></textarea>
  </label>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:value']);
const text = computed({
  get: () => props.value,
  set: val => emit('update:value', val)
});
const textareaEl = ref(null);
const handleAutoGrow = () => {};
</script>
