<template>
  <component
    :is="hasLinks ? 'a' : 'span'"
    :href="link"
    class="relative m-1 inline-flex items-center rounded py-0.5 px-3"
    :class="
      hasLinks
        ? 'border border-solid border-c-brown-600 text-c-brown-600 hover:bg-c-brown-600 hover:text-white'
        : 'bg-c-brown-600 text-white'
    "
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
  link: {
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
