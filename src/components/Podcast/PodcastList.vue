<template>
  <div
    v-if="videos && videos.length > 0"
    class="podcast-list"
    :class="{ shifted: isSidebarOpen}"
  >
    <PodcastCard
      v-for="video in videos"
      :key="video.id"
      :video="video" />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import PodcastCard from './PodcastCard.vue';

const props = defineProps({
  videos: {
    type: Array,
    required: true,
  },
});

const isSidebarOpen = inject('isSidebarOpen');
</script>
