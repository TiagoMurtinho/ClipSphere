<template>
  <div class="video-card">
    <img :src="video.snippet.thumbnails.medium.url"
         :alt="video.snippet.title"
         class="video-thumbnail"
    />
    <div class="video-info">
      <h3>{{ video.snippet.title }}</h3>
      <p class="channel-name">{{ video.snippet.channelTitle }}</p>
      <p class="time-ago">{{ formatTimeAgo(video.snippet.publishedAt) }}</p>
    </div>
  </div>
</template>

<script setup>
import './Video.css'
const props = defineProps({
  video: {
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
</script>
