<template>
  <label class="col-span-2">
    <p class="pb-1 pr-4 text-lg">{{ title }}</p>
    <input v-model="text" type="text" class="c-form w-full rounded border-c-gray-400" :placeholder="placeholder" />
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
</script>
