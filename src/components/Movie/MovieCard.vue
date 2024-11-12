<template>
  <div class="movie-card" @click="navigateToMovie" tabindex="0">
    <div class="thumbnail-container">
      <img
        :src="movie.snippet.thumbnails.high.url"
        alt="Movie Thumbnail"
        class="thumbnail"
      />
    </div>
    <div class="movie-info">
      <h3 class="title">{{ movie.snippet.title }}</h3>
      <p class="channel-name">{{ movie.snippet.channelTitle }}</p>
      <p class="time-ago">{{ formatTimeAgo(movie.snippet.publishedAt) }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

function navigateToMovie() {
  console.log('Navegando para o vídeo:', props.movie.id);
}

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

<style scoped>
.movie-card {
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  background-color: #fff;
  width: 300px;
  height: 550px;
  display: flex;
  flex-direction: column;
}

.movie-card:hover {
  transform: scale(1.03);
}

.thumbnail-container {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3% auto 0;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.movie-info {
  margin-top: 5%;
}

.movie-info p {
  margin: 2px 0;
  line-height: 1.2;
}

.title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 0;
}
</style>
