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
    />
  </div>
</template>

<script setup>
import './Video.css'
import VideoCard from './VideoCard.vue';
import { inject } from 'vue'

const props = defineProps({
  videos: {
    type: Array,
    required: true,
  },
});

const isSidebarOpen = inject('isSidebarOpen');
</script>

<style scoped>

</style>
