<template>
  <div
    v-if="videos && videos.length > 0"
    class="podcast-list"
    :class="{ shifted: isSidebarOpen}"
  >
    <PodcastCard
      v-for="video in videos"
      :key="video.id"
      :video="video"
      @click="handleVideoClick(video.id)"
    />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import PodcastCard from './PodcastCard.vue';
import router from '@/router/index.js'

const props = defineProps({
  videos: {
    type: Array,
    required: true,
  },
});

const handleVideoClick = (videoId) => {
  router.push(`/player/${videoId}`);
};

const isSidebarOpen = inject('isSidebarOpen');
</script>
