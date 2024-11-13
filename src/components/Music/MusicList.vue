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
    />
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
