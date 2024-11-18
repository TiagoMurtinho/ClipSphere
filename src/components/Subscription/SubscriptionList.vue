<template>
  <div class="subscription-list">
    <div v-if="channels && channels.length > 0"
         class="subscription-list-channel-grid"
         :class="{ shifted: isSidebarOpen }"
    >
      <div v-for="(channel, idx) in channels"
           :key="idx"
           class="subscription-list-channel-item"
           @click="openChannelModal(channel)"
      >
        <SubscriptionCard
          :channel="channel"
        />
      </div>
    </div>
    <NoResults
      v-else
      message="Nenhum canal encontrado!"
    />
    <ChannelModal
      v-if="selectedChannel"
      :visible="isModalVisible"
      :channel="selectedChannel"
      :videos="channelVideos"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import './Subscription.css'
import { inject, ref } from 'vue'
import SubscriptionCard from './SubscriptionCard.vue';
import NoResults from '@/components/NoData/NoDataComponent.vue';
import ChannelModal from './ChannelModal.vue';
import youtube from '../../api';

const isSidebarOpen = inject('isSidebarOpen');

defineProps({
  channels: {
    type: Array,
    required: true,
  },
});

const isModalVisible = ref(false);
const selectedChannel = ref(null);
const channelVideos = ref([]);

const openChannelModal = async (channel) => {
  selectedChannel.value = channel;
  await fetchChannelVideos(channel.id.channelId);
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedChannel.value = null;
  channelVideos.value = [];
};

async function fetchChannelVideos(channelId) {
  const now = new Date().getTime();
  const storedVideos = localStorage.getItem(`videos_${channelId}`);
  const storedTimestamp = localStorage.getItem(`videos_${channelId}_timestamp`);

  if (storedVideos && storedTimestamp && now - storedTimestamp < 24 * 60 * 60 * 1000) {
    channelVideos.value = JSON.parse(storedVideos);
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

      channelVideos.value = response.data.items.filter(item => item.id.kind === 'youtube#video');

      localStorage.setItem(`videos_${channelId}`, JSON.stringify(response.data.items));
      localStorage.setItem(`videos_${channelId}_timestamp`, now.toString());

    } catch (error) {
      console.error('Erro ao buscar vídeos do canal:', error.response ? error.response.data : error.message);
    }
  }
}
</script>
