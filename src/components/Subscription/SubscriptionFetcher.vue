<template>
  <div>
    <SubscriptionList
      v-if="channels && channels.length > 0"
      :channels="channels"
    />
    <NoResults
      v-else
      message="Nenhum canal encontrado!"
    />
    <VueSpinnerBars
      v-if="loading"
      size="40"
      color="blue" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SubscriptionList from './SubscriptionList.vue';
import youtube from '../../api';
import { VueSpinnerBars } from 'vue3-spinners'
import NoResults from '@/components/NoData/NoDataComponent.vue'

const channels = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchPopularChannels = async () => {
  loading.value = true;

  const storedChannels = localStorage.getItem('popularChannels');
  const storedTimestamp = localStorage.getItem('popularChannelsTimestamp');
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  if (storedChannels && storedTimestamp && (now - storedTimestamp < oneDay)) {
    channels.value = JSON.parse(storedChannels);
    loading.value = false;
    return;
  }

  try {
    const channelsResponse = await youtube.get('/search', {
      params: {
        part: 'snippet',
        type: 'channel',
        order: 'viewCount',
        maxResults: 21,
      },
    });

    channels.value = channelsResponse.data.items;

    localStorage.setItem('popularChannels', JSON.stringify(channels.value));
    localStorage.setItem('popularChannelsTimestamp', now.toString());
  } catch (err) {
    error.value = 'Erro ao buscar canais: ' + err.message;
  } finally {
    loading.value = false;
  }
};


onMounted(() => {
  fetchPopularChannels();
});
</script>
