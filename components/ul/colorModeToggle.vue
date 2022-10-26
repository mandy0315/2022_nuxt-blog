<template>
  <button @click="setColorMode($colorMode.preference === 'dark' ? 'light' : 'dark')">
    <client-only>
      <Icon
        v-if="$colorMode.value === 'dark'"
        icon="material-symbols:lightbulb-outline-rounded"
        class="inline-block align-middle text-xl"
      />
      <Icon v-else icon="material-symbols:lightbulb-rounded" class="inline-block align-middle text-xl" />
    </client-only>
  </button>
</template>

<script setup>
const colorMode = useColorMode();

const setColorMode = color => {
  colorMode.preference = color;
};
</script>

<style lang="scss" scoped></style>
