<template>
  <div class="trending-card">
    <img
      :src="video.snippet.thumbnails.medium.url"
      alt="Thumbnail"
      class="trending-thumbnail" />
    <div class="trending-info">
      <h3>{{ video.snippet.title }}</h3>
      <p>{{ video.snippet.channelTitle }}</p>
      <p>{{ formatCount(video.statistics.viewCount) }} views</p>
    </div>
  </div>
</template>

<script setup>
import './Trending.css'

defineProps({
  video: {
    type: Object,
    required: true
  }
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
