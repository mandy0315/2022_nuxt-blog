<script setup>
const props = defineProps({
  arrow: {
    type: String,
    default: 'center'
  }
});
const arrowPosStyle = computed(() => `arrow-${props.arrow}`);
</script>

<template>
  <div class="relative min-h-[2rem] min-w-[9.25rem] rounded-md bg-white shadow-select-box">
    <div class="arrow" :class="arrowPosStyle"></div>
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.arrow {
  @apply absolute -top-2 h-2 w-4 overflow-hidden;
  &:before {
    @apply absolute top-1 block h-4 w-4 rotate-45  bg-white shadow-select-box content-[''];
  }
  &-left {
    @apply left-2;
  }
  &-right {
    @apply right-2;
  }
  &-center {
    @apply left-[calc(50%-0.5rem)];
  }
}
</style>
