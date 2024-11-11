<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <button @click="closeModal" class="close-button">✖</button>

      <div class="channel-header">
        <div class="channel-info">

          <img :src="channel?.snippet.thumbnails.medium.url || 'default-thumbnail.jpg'" alt="Channel Thumbnail" class="channel-thumbnail" />
          <div class="channel-text">
            <h2>{{ channel?.snippet.channelTitle || 'Canal desconhecido' }}</h2>
            <p class="channel-description">{{ channel?.snippet.description || 'Descrição não disponível.' }}</p>
          </div>
        </div>
      </div>

      <div class="video-list">
        <h3>Recent Videos</h3>
        <div class="video-grid">
          <div v-for="video in videos" :key="video.id.videoId" class="video-item">
            <img :src="video.snippet.thumbnails.medium.url" alt="Video Thumbnail" class="video-thumbnail" />
            <p>{{ video.snippet.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onUnmounted, watch } from 'vue'

const emit = defineEmits(['close']);

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  channel: {
    type: Object,
    required: true,
  },
  videos: {
    type: Array,
    required: true,
  },
});

const closeModal = () => {
  emit('close');
};

function blockScroll() {
  document.body.style.overflow = 'hidden';
}

function releaseScroll() {
  document.body.style.overflow = '';
}

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      blockScroll();
    } else {
      releaseScroll();
    }
  }
);

onUnmounted(() => {
  releaseScroll();
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
}

.modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  width: 70%;
  max-width: 900px;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-out;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  border-radius: 50%;
  font-size: 10px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.close-button:hover {
  background-color: #eaeaea;
  transform: scale(1.1);
}

.channel-header {
  margin-bottom: 20px;
}

.channel-info {
  display: flex;
  align-items: center;
}

.channel-thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.channel-text {
  flex-grow: 1;
}

.channel-header h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.channel-description {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
}

.video-list {
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.video-list::-webkit-scrollbar {
  width: 8px;
}

.video-list::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.video-list::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.video-list::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}

.video-list h3 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.video-item {
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
}

.video-thumbnail {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-bottom: 2px solid #f1f1f1;
}

.video-item p {
  padding: 10px;
  background-color: #f9f9f9;
  font-size: 1rem;
  color: #444;
  font-weight: bold;
  margin: 0;
}

.video-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.video-item:hover .video-thumbnail {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
</style>
