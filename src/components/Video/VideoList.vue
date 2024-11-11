<template>
  <div class="video-list">
    <VideoCard v-for="video in videos"
               :key="video.id"
               :video="video"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import VideoCard from './VideoCard.vue';

const props = defineProps({
  videos: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.video-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 1200px;
  margin: 3% auto 0 0.7%;
  gap: 1.9%;
}

.video-card {
  flex: 1 1 calc(33.333% - 32px);
}
</style>
