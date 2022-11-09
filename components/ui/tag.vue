<template>
  <component
    :is="hasLinks ? 'a' : 'span'"
    :href="`/categories/${name.toLowerCase()}`"
    class="relative m-1 inline-flex items-center rounded bg-c-gray-600 py-0.5 px-3 text-white hover:bg-c-gray-800"
    @click="hasCloseIcon ? emit('handleDeleteTag', name) : ''"
  >
    <span class="inline-block text-xs">
      {{ name }}
    </span>
    <span v-if="hasCloseIcon" class="pl-3">
      <Icon icon="ion:ios-close" class="absolute top-0 right-0 inline-block text-xl" />
    </span>
  </component>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  hasLinks: {
    type: Boolean,
    default: true
  },
  hasCloseIcon: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['handleDeleteTag']);
</script>

<style lang="scss" scoped></style>
