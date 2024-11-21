<template>
  <div class="subscribed-channel-video-card">
    <img :src="video.snippet.thumbnails.medium.url" alt="Video Thumbnail" class="subscribed-channel-video-thumbnail" />
    <p class="subscribed-channel-video-title">{{ video.snippet.title }}</p>
  </div>
</template>

<script setup>
defineProps({
  video: {
    type: Object,
    required: true
  }
});
</script>
