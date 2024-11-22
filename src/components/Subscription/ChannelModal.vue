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
            <h2>{{ channel?.snippet.channelTitle || channel?.snippet.localized.title || 'Canal desconhecido' }}</h2>
            <p class="subscription-channel-description">{{ channel?.snippet.description || 'Descrição não disponível.' }}</p>
            <button
              class="subscribe-button"
              @click="subscribeToChannel"
              :class="{ subscribed: isSubscribed && isAuthenticated }"
            >
               <span v-if="isSubscribed && isAuthenticated === true">
                  Subscrito
                 <CIcon :icon="cilCheck" />
               </span>
               <span v-else>
                  Subscrever
               </span>
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
            @click="goToPlayerView(video.id.videoId)"
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
import { getCurrentInstance, inject, onUnmounted, ref, watch } from 'vue'
import { CIcon } from '@coreui/icons-vue'
import { cilX, cilCheck } from '@coreui/icons'
import { useRouter } from 'vue-router'

const isAuthenticated = inject('isAuthenticated');
const emit = defineEmits(['close', 'openModal', 'goToPlayerView']);

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

const router = useRouter();

const closeModal = () => {
  emit('close');
};

const { proxy } = getCurrentInstance();
const swal = proxy.$swal;
const isSubscribed = ref(true);

const subscribeToChannel = () => {

  if (!isAuthenticated.value) {
    emit('openModal');
    return;
  }

  const channelId = props.channel?.id?.channelId || props.channel?.id;
  if (!channelId) return;

  const subscribedChannels = JSON.parse(localStorage.getItem('subscribedChannels')) || [];
  if (subscribedChannels.includes(channelId)) {

    const updatedChannels = subscribedChannels.filter(channel => channel !== channelId);
    localStorage.setItem('subscribedChannels', JSON.stringify(updatedChannels));

    isSubscribed.value = false;

    swal({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: `Você se desinscreveu do canal: ${props.channel?.snippet.channelTitle}`,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    return;
  }

  const updatedChannels = [...subscribedChannels, channelId];
  localStorage.setItem('subscribedChannels', JSON.stringify(updatedChannels));

  isSubscribed.value = true;

  swal({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: `Você se inscreveu no canal: ${props.channel?.snippet.channelTitle}`,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  isSubscribed.value = true;
};

const updateSubscriptionStatus = () => {

  const channelId = props.channel?.id?.channelId || props.channel?.id;

  if (!channelId) {
    isSubscribed.value = false;
    return;
  }

  const subscribedChannels = JSON.parse(localStorage.getItem('subscribedChannels')) || [];

  isSubscribed.value = subscribedChannels.includes(channelId);
};

const goToPlayerView = (videoId) => {
  router.push(`/player/${videoId}`)
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
      updateSubscriptionStatus();
    } else {
      releaseScroll();
    }
  }
);

onUnmounted(() => {
  releaseScroll();
});
</script>
