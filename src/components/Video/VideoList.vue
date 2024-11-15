<template>
  <div
    v-if="videos && videos.length > 0"
    class="video-list"
    :class="{ shifted: isSidebarOpen }"
  >
    <VideoCard
      v-for="video in videos"
      :key="video.id"
      :video="video"
      @click="handleVideoClick(video.id.videoId || video.id)"
    />
  </div>
</template>

<script setup>
import './Video.css'
import VideoCard from './VideoCard.vue';
import { inject } from 'vue'
import router from '@/router/index.js'

const props = defineProps({
  videos: {
    type: Array,
    required: true,
  },
});

const isSidebarOpen = inject('isSidebarOpen');

const handleVideoClick = (videoId) => {
  router.push(`/player/${videoId}`);
};
</script>

<style scoped>

</style>
