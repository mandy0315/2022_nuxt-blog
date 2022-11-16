<template>
  <teleport to="body">
    <vue-final-modal
      v-slot="{ params, close }"
      v-bind="$attrs"
      classes="flex items-center justify-center"
      :content-class="contentClass"
    >
      <Icon
        v-if="hasCloseIcon"
        icon="mingcute:close-line"
        class="absolute top-0 right-0 mt-4 mr-4 text-3xl"
        @click="close"
      />

      <div :class="modalTitleClass">
        <slot name="title"></slot>
      </div>
      <div :class="modalContentClass">
        <slot :params="params"></slot>
      </div>
    </vue-final-modal>
  </teleport>
</template>

<script setup>
const props = defineProps({
  hasCloseIcon: {
    type: Boolean,
    default: true
  },
  modalContainerClass: {
    type: String,
    default: ''
  },
  modalTitleClass: {
    type: String,
    default: ''
  },
  modalContentClass: {
    type: String,
    default: ''
  }
});

const contentClass = computed(() => {
  const style = ['modal-container'].concat(props.modalContainerClass);
  return style;
});
</script>

<style lang="scss" scoped>
::v-deep(.modal-container) {
  @apply relative mx-4 flex max-h-full w-full flex-col rounded border bg-white p-4 dark:border-gray-800 dark:bg-gray-900;
}
</style>
