<template>
  <div ref="comment_el"></div>
</template>

<script setup>
const config = useRuntimeConfig();
const comment_el = ref(null);
const props = defineProps({
  postTitle: {
    type: String,
    required: true
  }
});
onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.setAttribute('data-repo', config.public.GISCUS_REPO);
  script.setAttribute('data-repo-id', config.public.GISCUS_REPO_ID);
  script.setAttribute('data-category', config.public.GISCUS_CATEGORY);
  script.setAttribute('data-category-id', config.public.GISCUS_CATEGORY_ID);
  script.setAttribute('data-mapping', 'specific');
  script.setAttribute('data-term', [`${props.postTitle}`]);
  script.setAttribute('data-strict', '0');
  script.setAttribute('data-reactions-enabled', '1');
  script.setAttribute('data-emit-metadata', '0');
  script.setAttribute('data-input-position', 'top');
  script.setAttribute('data-theme', 'light');
  script.setAttribute('data-lang', 'zh-TW');
  script.setAttribute('crossorigin', 'anonymous');
  script.setAttribute('async', '');

  comment_el.value.appendChild(script);
});
</script>
