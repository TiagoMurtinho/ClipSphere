<template>
  <div>
    <TrendingList
      v-if="trendingVideos && trendingVideos.length > 0"
      :trendingVideos="trendingVideos"
    />
    <NoResults
      v-else
      message="Nenhuma tendência encontrada!"
    />
    <VueSpinnerBars
      v-if="loading"
      size="40"
      color="blue"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TrendingList from './TrendingList.vue';
import NoResults from '@/components/NoData/NoDataComponent.vue';
import { VueSpinnerBars } from 'vue3-spinners';
import youtube from '../../api';

const trendingVideos = ref([]);
const loading = ref(true);

const fetchTrendingVideos = async () => {
  loading.value = true;

  const storedTrending = localStorage.getItem('youtubeTrending');
  const storedTimestamp = localStorage.getItem('youtubeTrendingTimestamp');
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  if (storedTrending && storedTimestamp && (now - storedTimestamp < oneDay)) {
    trendingVideos.value = JSON.parse(storedTrending);
    loading.value = false;
    return;
  }

  try {
    const response = await youtube.get('/videos', {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        regionCode: 'PT',
        maxResults: 24,
      },
    });

    trendingVideos.value = response.data.items || [];

    localStorage.setItem('youtubeTrending', JSON.stringify(trendingVideos.value));
    localStorage.setItem('youtubeTrendingTimestamp', now.toString());
  } catch (error) {
    console.error('Erro ao buscar as tendências:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTrendingVideos);
</script>
