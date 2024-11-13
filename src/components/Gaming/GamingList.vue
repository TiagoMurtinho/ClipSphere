<template>
  <div
    v-if="videos && videos.length > 0"
    class="gaming-list"
    :class="{ shifted: isSidebarOpen}"
  >
    <GamingCard v-for="video in videos" :key="video.id" :video="video" />
  </div>
</template>

<script setup>
import GamingCard from './GamingCard.vue';
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
.gaming-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 5%;
  margin-bottom: 5%;
  transition: margin-left 0.3s ease-in-out;
}

.gaming-list.shifted {
  margin-left: 16%;
  transition: margin-left 0.3s ease-in-out;
}
</style>
