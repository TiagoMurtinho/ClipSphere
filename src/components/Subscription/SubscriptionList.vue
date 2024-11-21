<template>
  <div class="subscription-list">

    <div
      v-if="allVideos.length > 0"
      class="subscription-list-video-grid"
      :class="{ shifted: isSidebarOpen }"
    >
      <div class="subscription-list-video-row">
        <div
          v-for="(video, videoIdx) in allVideos"
          :key="videoIdx"
        >
          <SubscribedVideoCard :video="video" />
        </div>
      </div>
    </div>

    <div
      v-else-if="channels && channels.length > 0"
      class="subscription-list-channel-grid"
      :class="{ shifted: isSidebarOpen }"
    >
      <div
        v-for="(channel, idx) in channels"
        :key="idx"
        class="subscription-list-channel-item"
        @click="openChannelModal(channel)"
      >
        <SubscriptionCard :channel="channel" />
      </div>
    </div>

    <NoResults v-else message="Nenhum canal encontrado!" />

    <ChannelModal
      v-if="selectedChannel"
      :visible="isModalVisible"
      :channel="selectedChannel"
      :videos="videosByChannel[selectedChannel.id.channelId] || []"
      @close="closeModal"
      @openModal="openModal"
    />
  </div>
</template>

<script setup>
import './Subscription.css'
import { inject, ref, onMounted, computed } from 'vue'
import SubscriptionCard from './SubscriptionCard.vue';
import NoResults from '@/components/NoData/NoDataComponent.vue';
import ChannelModal from './ChannelModal.vue';
import youtube from '../../api';
import SubscribedVideoCard from '@/components/Subscription/SubscribedVideoCard.vue'

const emit = defineEmits(['openModal']);
const isSidebarOpen = inject('isSidebarOpen');

defineProps({
  channels: {
    type: Array,
    required: true,
  },
});

const isModalVisible = ref(false);
const selectedChannel = ref(null);
const videosByChannel = ref({});
const subscribedChannels = JSON.parse(localStorage.getItem('subscribedChannels')) || [];

const allVideos = computed(() => {
  let videos = [];
  subscribedChannels.forEach(channelId => {
    const channelVideos = videosByChannel.value[channelId] || [];
    videos = videos.concat(channelVideos);
  });
  return videos;
});

const openChannelModal = async (channel) => {
  selectedChannel.value = channel;
  const channelId = selectedChannel.value?.id?.channelId;

  if (channelId) {
    await fetchChannelVideos(channelId);
  } else {
    console.error('Erro: channelId não encontrado');
  }

  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedChannel.value = null;
};

async function fetchChannelVideos(channelId) {
  const now = new Date().getTime();
  const storedVideos = localStorage.getItem(`videos_${channelId}`);
  const storedTimestamp = localStorage.getItem(`videos_${channelId}_timestamp`);

  if (storedVideos && storedTimestamp && now - storedTimestamp < 24 * 60 * 60 * 1000) {
    videosByChannel.value[channelId] = JSON.parse(storedVideos);
  } else {
    try {
      const response = await youtube.get('/search', {
        params: {
          part: 'snippet',
          channelId: channelId,
          maxResults: 10,
          order: 'date',
        },
      });

      const filteredVideos = response.data.items.filter(item => item.id.kind === 'youtube#video');

      videosByChannel.value[channelId] = filteredVideos;

      localStorage.setItem(`videos_${channelId}`, JSON.stringify(filteredVideos));
      localStorage.setItem(`videos_${channelId}_timestamp`, now.toString());
    } catch (error) {
      console.error('Erro ao buscar vídeos do canal:', error.response ? error.response.data : error.message);
    }
  }
}

const openModal = () => {
  emit('openModal');
};

onMounted(() => {
  if (subscribedChannels.length > 0) {
    subscribedChannels.forEach(async (channelId) => {
      await fetchChannelVideos(channelId);
    });
  }
});
</script>
