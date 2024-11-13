<template>
  <div>
    <div
      class="gaming-title"
      :class="{ 'gaming-title-alt': isSidebarOpen }"
    >
      <CIcon
        :icon="cilGamepad"
        size="3xl"
        class="heading-icon">
      </CIcon>
      <h2 class="gaming-title-heading">Vídeo Jogos:</h2>
    </div>
    <GamingFetch
      v-slot="{ videos }"
    >
      <GamingList
        :videos="videos"
      />
    </GamingFetch>
  </div>
</template>

<script setup>
import '../assets/CSS/GamingView.css'
import GamingFetch from '../components/Gaming/GamingFetch.vue';
import GamingList from '../components/Gaming/GamingList.vue';
import { cilGamepad } from '@coreui/icons'
import { CIcon } from '@coreui/icons-vue'
import { inject } from 'vue';

const isSidebarOpen = inject('isSidebarOpen');
</script>
