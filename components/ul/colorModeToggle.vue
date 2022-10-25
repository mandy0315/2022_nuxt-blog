<template>
  <button @click="setColorMode($colorMode.preference === 'dark' ? 'light' : 'dark')">
    <Icon
      icon="material-symbols:lightbulb-outline-rounded"
      v-if="$colorMode.value === 'dark'"
      class="inline-block align-middle text-xl"
    />
    <Icon v-else icon="material-symbols:lightbulb-rounded" class="inline-block align-middle text-xl" />
  </button>
</template>

<script setup>
const colorMode = useColorMode();

const setColorMode = color => {
  colorMode.preference = color;
};
</script>

<style lang="scss" scoped></style>
