<template>
  <div
    v-if="videos && videos.length > 0"
    class="sport-list"
    :class="{ shifted: isSidebarOpen}"
  >
    <SportCard
      v-for="video in videos"
      :key="video.id"
      :video="video" />
  </div>
</template>

<script setup>
import SportCard from './SportCard.vue';
import { inject } from 'vue'

const props = defineProps({
  videos: {
    type: Array,
    required: true,
  },
});

const isSidebarOpen = inject('isSidebarOpen');
</script>

<style scoped>
.sport-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 5%;
  margin-bottom: 5%;
  transition: margin-left 0.3s ease-in-out;
}

.sport-list.shifted {
  margin-left: 16%;
  transition: margin-left 0.3s ease-in-out;
}
</style>
