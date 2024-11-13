<template>
  <div
    v-if="trendingVideos && trendingVideos.length > 0"
    class="trending-list"
    :class="{ shifted: isSidebarOpen }">
    <div
      v-for="(video, idx) in trendingVideos"
      :key="idx">
      <TrendingCard :video="video" />
    </div>
  </div>
</template>

<script setup>
import './Trending.css'
import TrendingCard from './TrendingCard.vue';
import { inject } from 'vue'

defineProps({
  trendingVideos: {
    type: Array,
    required: true
  }
});

const isSidebarOpen = inject('isSidebarOpen');
</script>
