<template>
  <div
    v-if="musicList && musicList.length > 0"
    class="music-list"
    :class="{ shifted: isSidebarOpen }"
  >
    <MusicCard v-for="(music, idx) in musicList" :key="idx" :music="music" />
  </div>
</template>

<script setup>
import MusicCard from './MusicCard.vue';
import { inject } from 'vue'

const isSidebarOpen = inject('isSidebarOpen');

defineProps({
  musicList: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.music-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  margin-left: 5%;
  transition: margin-left 0.3s ease-in-out;
}

.music-list.shifted {
  margin-left: 18%;
  transition: margin-left 0.3s ease-in-out;
}

.music-list > * {
  flex: 1 1 30%;
  max-width: 30%;
}
</style>
