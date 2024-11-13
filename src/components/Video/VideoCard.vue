<template>
  <div class="video-card">
    <img :src="video.snippet.thumbnails.medium.url"
         :alt="video.snippet.title"
         class="video-thumbnail"
    />
    <div class="video-info">
      <h3 class="title">{{ video.snippet.title }}</h3>
      <p class="channel-name">{{ video.snippet.channelTitle }}</p>
      <p class="time-ago">{{ formatTimeAgo(video.snippet.publishedAt) }}</p>
    </div>
  </div>
</template>

<script setup>

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

<style scoped>
.video-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  height: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.video-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.video-thumbnail {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.video-info {
  padding: 10px;
  flex: 1;
}

.video-info h3 {
  font-size: 1.2rem;
  margin: 0;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.video-info p {
  margin: 5px 0;
  color: #555;
  font-size: 0.9rem;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
