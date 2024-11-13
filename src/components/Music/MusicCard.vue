<template>
  <div class="music-card">
    <div class="music-thumbnail-container">
      <img
        :src="music.snippet.thumbnails.high.url"
        alt="Music Thumbnail"
        class="music-thumbnail"
      />
    </div>
    <div class="music-info">
      <h3 class="music-card-title">{{ music.snippet.title }}</h3>
      <p class="music-channel-name">{{ music.snippet.channelTitle }}</p>
      <p class="music.time-ago">{{ formatTimeAgo(music.snippet.publishedAt) }}</p>
    </div>
  </div>
</template>

<script setup>
import './Music.css'

const props = defineProps({
  music: {
    type: Object,
    required: true,
  },
});

function formatTimeAgo(publishedAt) {
  const date = new Date(publishedAt);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);

  if (days > 0) return `${days} dia${days > 1 ? 's' : ''} atrás`;
  if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
  if (minutes > 0) return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
  return 'Agora mesmo';
}
</script>
