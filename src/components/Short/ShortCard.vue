<template>
  <div
    v-if="video && video.snippet"
    class="shorts-card"
  >
    <div class="short-thumbnail">
      <img
        :src="video.snippet.thumbnails.medium.url"
        alt="Short thumbnail"
      />
    </div>

    <div class="short-info">
      <h3 class="short-title">{{ truncatedTitle }}</h3>
    </div>
  </div>
</template>

<script setup>
import './Short.css'
import { computed } from 'vue';

const props = defineProps({
  video: {
    type: Object,
    required: true,
    default: () => ({})
  },
});

const truncatedTitle = computed(() => {
  return props.video.snippet.title.length > 40
    ? props.video.snippet.title.slice(0, 40) + '...'
    : props.video.snippet.title;
});

</script>
