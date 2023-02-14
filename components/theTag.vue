<template>
  <span
    class="relative m-1 inline-flex items-center rounded border border-solid border-c-brown-200 py-0.5 px-3"
    :class="tagStyle"
    @click="hasCloseIcon ? emit('handleDeleteTag', name) : ''"
  >
    <span class="inline-block text-sm">
      {{ firstWordToUpperCase }}
    </span>
    <span v-if="number" class="ml-1 self-start text-xs">{{ number }}</span>
    <span v-if="hasCloseIcon" class="pl-3">
      <Icon icon="ion:ios-close" class="absolute top-0 right-0 inline-block text-xl" />
    </span>
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  number: {
    type: Number,
    default: 0
  },
  hasLinks: {
    type: Boolean,
    default: true
  },
  hasCloseIcon: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['handleDeleteTag']);
const firstWordToUpperCase = computed(() => props.name.replace(/^./, props.name[0].toUpperCase()));

const tagStyle = computed(() => {
  return props.hasLinks && props.isActive
    ? 'cursor-pointer bg-c-brown-200 text-white'
    : props.hasLinks
    ? 'cursor-pointer  text-c-brown-200 hover:bg-c-brown-200 hover:text-white'
    : 'cursor-default bg-c-brown-200 text-white';
});
</script>
