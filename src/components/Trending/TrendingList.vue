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

<style scoped>
.trending-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 5%;
  margin-bottom: 5%;
  transition: all 0.2s ease-in-out;
}

.trending-list.shifted {
  margin-left: 17.5%;
  gap: 50px;
  transition: all 0.2s ease-in-out;
}
</style>
