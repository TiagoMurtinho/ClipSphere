<template>
  <div
    class="search-results-container"
    :class="{ shifted: isSidebarOpen }"
  >

    <div
      v-if="loading"
      class="spinner-container"
    >
      <VueSpinnerBars
        size="40"
        color="blue"
      />
    </div>

    <NoResults
      v-if="!loading && videos.length === 0"
      message="Nenhum vídeo encontrado para '{{ searchQuery }}'."
    />

    <div
      v-if="!loading && videos.length > 0"
      class="search-results-videos-list"
    >
      <div
        v-for="video in videos"
        :key="video.id.videoId"
        class="search-results-video-item"
        @click="handleVideoClick(video.id.videoId)"
      >
        <img
          :src="video.snippet.thumbnails.high.url"
          alt="Thumbnail"
          class="search-results-video-thumbnail"
        />
        <div class="search-results-video-info">
          <h3>{{ video.snippet.title }}</h3>

          <div class="search-results-video-meta">
            <span class="search-results-video-views">{{ video.statistics.viewCount }} views</span> •
            <span class="search-results-video-published-at">{{ formatTimeAgo(video.snippet.publishedAt) }}</span>
          </div>

          <div class="search-results-video-channel">
            <img
              v-if="video.snippet.channelThumbnail"
              :src="video.snippet.channelThumbnail"
              alt="Channel"
              class="search-results-channel-thumbnail"
            />
            <span>{{ video.snippet.channelTitle }}</span>
          </div>

          <p class="search-results-video-description">{{ video.snippet.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import './SearchResults.css'
import router from '@/router/index.js'
import { inject } from 'vue'
import { VueSpinnerBars } from 'vue3-spinners'
import NoResults from '@/components/NoData/NoDataComponent.vue'

const isSidebarOpen = inject('isSidebarOpen');

const props = defineProps({
  searchQuery: String,
  videos: Array,
  loading: Boolean,
});

function formatTimeAgo(publishedAt) {
  const date = new Date(publishedAt);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} ano${years > 1 ? 's' : ''} atrás`;
  }
  if (months > 0) {
    return `${months} mês${months > 1 ? 'es' : ''} atrás`;
  }
  if (days > 0) {
    return `${days} dia${days > 1 ? 's' : ''} atrás`;
  }
  if (hours > 0) {
    return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
  }
  if (minutes > 0) {
    return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
  }
  return 'Agora mesmo';
}

const handleVideoClick = (videoId) => {
  router.push(`/player/${videoId}`);
};
</script>
