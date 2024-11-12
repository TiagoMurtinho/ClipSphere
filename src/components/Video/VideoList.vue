<template>
  <div class="video-list">
    <VideoCard v-for="video in videos"
               :key="video.id"
               :video="video"
    />
  </div>
</template>

<script setup>
import VideoCard from './VideoCard.vue';

const props = defineProps({
  videos: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.video-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  margin-left: 5%;
}

.video-list > * {
  flex: 1 1 30%;
  max-width: 30%;
}
</style>
