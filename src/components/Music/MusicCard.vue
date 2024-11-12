<template>
  <div class="music-card" @click="navigateToMusic" tabindex="0">
    <div class="thumbnail-container">
      <img
        :src="music.snippet.thumbnails.high.url"
        alt="Music Thumbnail"
        class="thumbnail"
      />
    </div>
    <div class="music-info">
      <h3 class="title">{{ music.snippet.title }}</h3>
      <p class="channel-name">{{ music.snippet.channelTitle }}</p>
      <p class="time-ago">{{ formatTimeAgo(music.snippet.publishedAt) }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  music: {
    type: Object,
    required: true,
  },
});

function navigateToMusic() {
  console.log('Navegando para a música:', props.music.id);
}

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

<style scoped>
.music-card {
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  margin: 3% 16px 16px;
  background-color: #fff;
  max-width: 350px;
  max-height: 350px;
  text-align: center;
}

.music-card:hover {
  transform: scale(1.05);
}

.music-card:hover .thumbnail {
  animation: rotate-fast 10s linear infinite;
}

.thumbnail-container {
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3% auto 0;
}

.thumbnail {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  animation: rotate-slow 60s linear infinite;
}

@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotate-fast {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.music-info {
  margin-top: 5%;
  text-align: left;
}

.music-info p {
  margin: 2px 0;
  line-height: 1.2;
  color: #555;
}

.title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 0;
  color: #333;
}
</style>
