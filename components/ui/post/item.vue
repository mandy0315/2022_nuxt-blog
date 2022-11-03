<template>
  <div class="flex items-center">
    <div class="w-3/4 pr-6">
      <h3 class="pb-2 text-xl text-c-orange-800">{{ title }}</h3>
      <div class="pb-2 text-sm">
        <span class="pr-3"
          ><Icon icon="ic:outline-access-time" class="mr-1 inline-block" />{{ dateFormat(update_time) }}</span
        >
        <span><Icon icon="material-symbols:folder-open-outline" class="mr-1 inline-block" />{{ category }}</span>
      </div>
      <p class="line-clamp-3">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae inventore fugit expedita voluptatem ea
        blanditiis odit, facere, eos fuga nisi ratione rerum maxime. Blanditiis nemo aliquam vel eligendi quod quisquam,
        itaque hic culpa debitis iure minima quasi dicta perspiciatis eum odit! Suscipit asperiores dolores animi illo
        eveniet. Quos quis nemo repudiandae ipsum, excepturi, voluptatum labore harum ab similique modi possimus, earum
        nam? Magnam quo aperiam, voluptatibus itaque nihil incidunt doloribus neque accusamus maxime illum, ea nesciunt
        nisi est consequuntur unde maiores assumenda soluta iste aut culpa quod sunt? Facere rerum nulla molestias
        suscipit sit quae hic ipsum nesciunt blanditiis quibusdam!
      </p>
    </div>

    <ui-post-image class="w-[230px]" />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  update_time: {
    type: String,
    default: ''
  }
});
const { dateFormat } = useDateTime();
console.log(props.content);
</script>

<style lang="scss" scoped></style>
