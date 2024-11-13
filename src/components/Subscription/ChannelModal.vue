<template>
  <div v-if="visible" class="subscription-modal-overlay">
    <div class="subscription-modal-content">
      <button
        @click="closeModal"
        class="subscription-close-button"
      >
        <CIcon
        :icon="cilX"
        />
      </button>
      <div class="subscription-channel-header">
        <div class="subscription-channel-info">

          <img
            :src="channel.snippet.thumbnails.medium.url"
            alt="Channel Thumbnail"
            class="subscription-channel-thumbnail"
          />
          <div class="subscription-channel-text">
            <h2>{{ channel?.snippet.channelTitle || 'Canal desconhecido' }}</h2>
            <p class="subscription-channel-description">{{ channel?.snippet.description || 'Descrição não disponível.' }}</p>
            <button
              class="subscribe-button"
              @click="subscribeToChannel"
            >
              Subscrever
            </button>
          </div>
        </div>
      </div>

      <div class="subscription-video-list">
        <h3>Recent Videos</h3>
        <div class="subscription-video-grid">
          <div
            v-for="video in videos"
            :key="video.id.videoId"
            class="subscription-video-item"
          >
            <img
              :src="video.snippet.thumbnails.medium.url"
              alt="Video Thumbnail"
              class="subscription-video-thumbnail"
            />
            <p>{{ video.snippet.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import './Subscription.css'
import { getCurrentInstance, onUnmounted, watch } from 'vue'
import { CIcon } from '@coreui/icons-vue'
import { cilX } from '@coreui/icons'

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

const { proxy } = getCurrentInstance();
const swal = proxy.$swal;

const subscribeToChannel = () => {
  swal({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: `Você se inscreveu no canal: ${props.channel?.snippet.channelTitle}`,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
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
