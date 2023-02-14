<template>
  <label>
    <div class="flex items-center">
      <p class="pb-1 pr-4 text-lg">{{ title }}</p>
      <div class="ml-auto">
        <slot name="title-right"></slot>
      </div>
    </div>
    <div class="relative">
      <input
        v-model.lazy="text"
        :type="inputType"
        class="c-form w-full rounded focus:border-c-brown-200"
        :placeholder="placeholder"
      />
      <slot></slot>
    </div>
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
  },
  inputType: {
    type: String,
    default: 'text'
  }
});

const emit = defineEmits(['update:value']);

const text = computed({
  get: () => props.value,
  set: val => emit('update:value', val)
});
</script>
