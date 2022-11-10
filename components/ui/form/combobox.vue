<template>
  <div class="relative">
    <label v-if="formTitle" for="input-tags">
      <p class="inline-block pb-1 pr-4 text-lg">{{ formTitle }}</p>
    </label>
    <div
      ref="combobox_el"
      class="form-input flex border-c-gray-400"
      :class="isOpen ? 'rounded-t border-b-0' : 'rounded'"
    >
      <div class="flex flex-1 flex-wrap">
        <template v-if="selectedTags.length > 0">
          <div v-for="item in selectedTags" :key="item">
            <ui-tag
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
          :placeholder="inputPlaceholder"
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
const combobox_el = ref(null);
const { isOpen, setContainer, openList } = useToggle();
const fillTag = ref('');

const emit = defineEmits(['update:selectedTags']);
const props = defineProps({
  formTitle: {
    type: String,
    default: ''
  },
  inputPlaceholder: {
    type: String,
    default: ''
  },
  tags: {
    type: Array,
    required: true
  },
  selectedTags: {
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
    return props.tags;
  }
  let count = 0;
  return props.tags.filter(tag => {
    if (tag.toLowerCase().includes(fillTag.value.toLowerCase()) && count < 10) {
      count++;
      return tag;
    }
  });
});

const addTag = val => {
  const filterSameCategories = computed(() => {
    return props.selectedTags.filter(tag => tag === val);
  });

  if (filterSameCategories.value.length === 0) {
    props.selectedTags.push(val);
  }
  fillTag.value = '';
};

const deleteTag = val => {
  props.selectedTags.splice(props.selectedTags.indexOf(val), 1);
};
</script>

<style lang="scss" scoped></style>
