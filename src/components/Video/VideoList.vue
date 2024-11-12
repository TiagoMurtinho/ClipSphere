<template>
  <div
    v-if="videos && videos.length > 0"
    class="video-list"
    :class="{ shifted: isSidebarOpen }"
  >
    <VideoCard v-for="video in videos"
               :key="video.id"
               :video="video"
    />
  </div>
</template>

<script setup>
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
.video-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  margin-left: 5%;
  margin-top: 5%;
  transition: margin-left 0.3s ease-in-out;
}

.video-list.shifted {
  margin-left: 18%;
  transition: margin-left 0.3s ease-in-out;
}

.video-list > * {
  flex: 1 1 23%;
  max-width: 23%;
}
</style>
