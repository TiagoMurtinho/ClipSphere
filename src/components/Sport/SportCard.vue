<template>
  <div class="sport-card">
    <img
      :src="video.snippet.thumbnails.medium.url"
      :alt="video.snippet.title"
      class="sport-thumbnail"
    />
    <div class="sport-info">
      <h3>{{ video.snippet.title }}</h3>
      <p>{{ video.snippet.channelTitle }}</p>
      <p>{{ formatCount(video.statistics.viewCount) }} views</p>
    </div>
  </div>
</template>

<script setup>
import './Sport.css'

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
