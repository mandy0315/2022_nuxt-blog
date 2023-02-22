<script setup>
const props = defineProps({
  isDarkMode: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:isDarkMode']);
const colorModeToggle = computed({
  get: () => props.isDarkMode,
  set: val => emit('update:isDarkMode', val)
});
</script>

<template>
  <div>
    <label
      class="relative inline-block h-8 w-[4.2rem] cursor-pointer rounded-full border border-c-line-gray bg-c-gray-100 p-1"
      :class="{ 'bg-c-black-200': colorModeToggle }"
    >
      <input v-model="colorModeToggle" type="checkbox" class="hidden" />
      <div
        class="box-border flex h-6 w-6 items-center justify-center rounded-full bg-white p-1 text-c-black-100 shadow-xl transition-all duration-300 ease-in-out"
        :class="{ 'translate-x-8 bg-c-black-300': isDarkMode }"
      >
        <Icon v-if="!isDarkMode" icon="ph:sun-bold" />
        <Icon v-else icon="ri:moon-clear-line" class="text-white" />
      </div>
    </label>
  </div>
</template>
