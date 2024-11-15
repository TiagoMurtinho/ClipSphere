<template>
  <div
    v-if="musicList && musicList.length > 0"
    class="music-list"
    :class="{ shifted: isSidebarOpen }"
  >
    <MusicCard
      v-for="(music, idx) in musicList"
      :key="idx"
      :music="music"
      @click="handleVideoClick(music.id)"
    />
  </div>
</template>

<script setup>

import MusicCard from './MusicCard.vue';
import { inject } from 'vue'
import router from '@/router/index.js'

const isSidebarOpen = inject('isSidebarOpen');

defineProps({
  musicList: {
    type: Array,
    required: true,
  },
});

const handleVideoClick = (musicId) => {
  router.push(`/player/${musicId}`);
};
</script>
