<template>
  <div class="podcast-card">
    <img :src="video.snippet.thumbnails.medium.url" :alt="video.snippet.title" class="podcast-thumbnail"/>
    <div class="podcast-info">
      <h3>{{ video.snippet.title }}</h3>
      <p>{{ video.snippet.channelTitle }}</p>
      <p>{{ formatCount(video.statistics.viewCount) }} views</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
});

function formatCount(count) {
  if (count >= 1_000_000) {
    return `${(Math.floor(count / 100_000) / 10).toFixed(1)}M`;
  } else if (count >= 1_000) {
    return `${(Math.floor(count / 100) / 10).toFixed(1)}K`;
  }
  return count.toString();
}
</script>

<style scoped>
.podcast-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  height: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.podcast-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.podcast-thumbnail {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.podcast-info {
  padding: 10px;
  flex: 1;
}

.podcast-info h3 {
  font-size: 1.2rem;
  margin: 0;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.podcast-info p {
  margin: 5px 0;
  color: #555;
  font-size: 0.9rem;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

