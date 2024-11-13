<template>
  <div class="movie-card">
    <div class="movie-card-thumbnail-container">
      <img
        :src="movie.snippet.thumbnails.medium.url"
        alt="Movie Thumbnail"
        class="movie-card-thumbnail"
      />
    </div>
    <div class="movie-card-info">
      <h3 class="movie-card-title">{{ movie.snippet.title }}</h3>
      <p class="movie-card-channel-name">{{ movie.snippet.channelTitle }}</p>
      <p class="movie-card-time-ago">{{ formatTimeAgo(movie.snippet.publishedAt) }}</p>
    </div>
  </div>
</template>

<script setup>
import './Movie.css'
const props = defineProps({
  movie: {
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
    return `${months} mes${months > 1 ? 'es' : ''} atrás`;
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
