<template>
  <div>
    <p class="pb-1 pr-4 text-lg">
      {{ title }}<span class="pl-2 text-sm text-c-brown-600">圖片限一張，檔案大小限200KB，支援 jpg、png、gif 格式</span>
    </p>
    <div class="c-form flex h-[35px] rounded p-0">
      <label class="group flex w-full items-center">
        <span class="mx-2 cursor-pointer">
          <Icon
            icon="ri:image-add-fill"
            class="text- text-xl group-hover:text-c-brown-600"
            :class="imageList.length === 1 ? 'text-c-brown-600' : 'text-c-gray-600'"
          />
        </span>
        <div class="block group-hover:text-c-brown-600">
          <div v-if="imageList.length > 0">
            <the-tag
              class="cursor-pointer"
              :name="imageList[0].name"
              :hasLinks="false"
              :hasCloseIcon="true"
              @handleDeleteTag="removeCurrImage(0, imageList)"
            />
          </div>
          <p v-else>請選擇檔案</p>
        </div>
        <input
          ref="inputFile_el"
          type="file"
          accept="image/*"
          class="hidden"
          :disabled="imageList.length === 1"
          @change="clickUploadImages({ event: $event, imageList })"
        />
      </label>
    </div>
    <p v-if="errorMsg" class="pt-2 pl-2 text-sm text-c-red-600">{{ errorMsg }}</p>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:value']);
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  value: {
    type: Array,
    default: []
  }
});

const { clickUploadImages, errorMsg, removeCurrImage } = useUpload();
const imageList = computed({
  get: () => props.value,
  set: val => emit('update:value', val)
});
</script>
