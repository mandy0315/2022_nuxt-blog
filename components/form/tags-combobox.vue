<template>
  <div class="relative">
    <label v-if="title" for="input-tags">
      <p class="inline-block pb-1 pr-4 text-lg">{{ title }}</p>
    </label>
    <div ref="combobox_el" class="c-form flex" :class="isOpen ? 'rounded-t border-b-0' : 'rounded'">
      <div class="flex flex-1 flex-wrap">
        <template v-if="selectedTags.length > 0">
          <div v-for="item in selectedTags" :key="item">
            <the-tag
              class="cursor-pointer"
              :name="item"
              :hasLinks="false"
              :hasCloseIcon="true"
              @handleDeleteTag="deleteTag"
            />
          </div>
        </template>

        <input
          id="input-tags"
          type="text"
          class="flex-1 self-center border-0 border-none py-0 px-1 shadow-none outline-none"
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
      class="absolute z-10 w-full rounded-b-lg border-l border-r border-b border-solid border-c-gray-400 bg-white shadow-md"
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
  let array = [...selectedTags.value];

  const filterSameCategories = array.filter(tag => tag === val);
  if (filterSameCategories.length === 0) {
    array.push(val);
    selectedTags.value = array;
  }
  fillTag.value = '';
};

const deleteTag = val => {
  let array = [...selectedTags.value];

  array.splice(array.indexOf(val), 1);
  selectedTags.value = array;
};
</script>
