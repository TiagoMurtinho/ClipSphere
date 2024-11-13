<template>
  <div>
    <div
      class="music-title"
      :class="{ 'music-title-alt': isSidebarOpen }"
    >
      <CIcon
        :icon="cilMusicNote"
        size="3xl"
        class="heading-icon">
      </CIcon>
      <h2 class="music-title-heading">Musicas:</h2>
    </div>
    <MusicFetch />
  </div>
</template>

<script setup>
import '../assets/CSS/MusicView.css'
import MusicFetch from '@/components/Music/MusicFetch.vue';
import { cilMusicNote } from '@coreui/icons'
import { CIcon } from '@coreui/icons-vue'
import { inject } from 'vue'

const isSidebarOpen = inject('isSidebarOpen');
</script>
