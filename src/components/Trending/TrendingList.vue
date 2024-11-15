<template>
  <div
    v-if="trendingVideos && trendingVideos.length > 0"
    class="trending-list"
    :class="{ shifted: isSidebarOpen }">
    <div
      v-for="(video, idx) in trendingVideos"
      :key="idx"
      @click="handleVideoClick(video.id.videoId || video.id)"
    >
      <TrendingCard :video="video" />
    </div>
  </div>
</template>

<script setup>
import './Trending.css'
import TrendingCard from './TrendingCard.vue';
import { inject } from 'vue'
import router from '@/router/index.js'

defineProps({
  trendingVideos: {
    type: Array,
    required: true
  }
});

const handleVideoClick = (videoId) => {
  router.push(`/player/${videoId}`);
};

const isSidebarOpen = inject('isSidebarOpen');
</script>
