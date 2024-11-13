<template>
  <div>
    <div
      class="podcast-title"
      :class="{ 'podcast-title-alt': isSidebarOpen }"
    >
      <CIcon
        :icon="cilMic"
        size="3xl"
        class="heading-icon">
      </CIcon>
      <h2 class="podcast-title-heading">Podcasts:</h2>
    </div>
    <PodcastFetch
      v-slot="{ videos }"
    >
      <PodcastList
        :videos="videos"
      />
    </PodcastFetch>
  </div>
</template>

<script setup>
import '../assets/CSS/PodcastsView.css'
import PodcastFetch from '../components/Podcast/PodcastFetch.vue';
import PodcastList from '../components/Podcast/PodcastList.vue';
import { cilMic } from '@coreui/icons'
import { CIcon } from '@coreui/icons-vue'
import { inject } from 'vue'

const isSidebarOpen = inject('isSidebarOpen');
</script>
