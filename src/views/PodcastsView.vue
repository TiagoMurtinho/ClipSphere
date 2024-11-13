<template>
  <div>
    <div class="title" :class="{ 'title-alt': isSidebarOpen }">
      <CIcon :icon="cilMic" size="3xl" class="icon"></CIcon>
      <h2 class="title-heading">Podcasts:</h2>
    </div>
    <PodcastFetch v-slot="{ videos }">
      <PodcastList :videos="videos" />
    </PodcastFetch>
  </div>
</template>

<script setup>
import PodcastFetch from '../components/Podcast/PodcastFetch.vue';
import PodcastList from '../components/Podcast/PodcastList.vue';
import { cilMic } from '@coreui/icons'
import { CIcon } from '@coreui/icons-vue'
import { inject } from 'vue'

const isSidebarOpen = inject('isSidebarOpen');
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  margin: 8% 9.5% -15px 9.5%;
  transition: margin-left 0.3s ease-in-out;
  position: relative;
  padding-bottom: 8px;
}

.title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 100%;
  background-color: #d3d3d3;
  transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
}

.title-heading {
  margin: 4px 8px 0 10px;
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.icon {
  color: #737373;
}

.title-alt {
  margin-left: 18%;
}

.title-alt::after {
  left: 0;
  width: calc(100% + 11%);
}
</style>
