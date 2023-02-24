<template>
  <div class="relative">
    <label v-if="title" for="input-tags">
      <p class="inline-block pb-1 pr-4 text-lg">{{ title }}</p>
    </label>
    <div ref="combobox_el" class="c-form flex" :class="isOpen ? 'rounded-t border-b-0' : 'rounded'">
      <div class="flex flex-1 flex-wrap">
        <template v-if="selectedTags.length > 0">
          <div v-for="tag in selectedTags" :key="tag">
            <button @click.prevent="deleteTag" class="c-round-btn c-round-btn-default relative mr-2 pr-7">
              {{ firstWordToUpperCase(tag) }}
              <i class="absolute right-1.5 -top-0.5 text-base">
                <Icon icon="ion:close-circle-sharp" class="inline-block" />
              </i>
            </button>
          </div>
        </template>

        <input
          id="input-tags"
          type="text"
          class="flex-1 self-center border-0 border-none py-0 shadow-none outline-none"
          autocomplete="off"
          :placeholder="placeholder"
          v-model.trim="fillTag"
          @click="openList"
          @keydown.enter.exact="addTag(fillTag)"
        />
      </div>
      <div>
        <Icon v-if="isOpen" icon="material-symbols:arrow-drop-up" class="inline-block" />
        <Icon v-else icon="material-symbols:arrow-drop-down" class="inline-block" />
      </div>
    </div>

    <ul
      v-if="isOpen"
      class="absolute z-10 w-full rounded-b-lg border-l border-r border-b border-solid border-c-line-gray bg-white shadow-md"
    >
      <li v-for="category in searchTags" :key="category" @click="addTag(category)" class="px-4 py-2 hover:bg-gray-200">
        {{ category }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';

const combobox_el = ref(null);
const fillTag = ref('');
const { isOpen, setContainer, openList } = useToggle();
const { firstWordToUpperCase } = useFormat();

const emit = defineEmits(['update:tags']);
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  tagList: {
    type: Array,
    required: true
  },
  tags: {
    type: Array,
    required: true
  }
});

onMounted(() => {
  setContainer(combobox_el.value);
});

// autocomplete
const searchTags = computed(() => {
  if (fillTag.value === '') {
    return props.tagList;
  }
  let count = 0;
  return props.tagList.filter(tag => {
    if (tag.toLowerCase().includes(fillTag.value.toLowerCase()) && count < 10) {
      count++;
      return tag;
    }
  });
});

const selectedTags = computed({
  get: () => props.tags,
  set: val => emit('update:tags', val)
});

const addTag = val => {
  const array = [...selectedTags.value];

  const value = val.toLowerCase();
  array.push(value);
  const notRepeatTags = [...new Set(array)];
  selectedTags.value = notRepeatTags;
  fillTag.value = '';
};

const deleteTag = val => {
  let array = [...selectedTags.value];

  array.splice(array.indexOf(val), 1);
  selectedTags.value = array;
};
</script>
