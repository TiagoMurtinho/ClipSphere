<template>
  <div>
    <GamingList
      v-if="videos && videos.length > 0"
      :videos="videos"
    />
    <NoResults
      v-else
      message="Nenhum vídeo jogo encontrado!"
    />
    <div
      v-if="loading"
      class="spinner-container"
    >
      <VueSpinnerBars size="40" color="blue" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import GamingList from './GamingList.vue';
import NoResults from '@/components/NoData/NoDataComponent.vue';
import youtube from '../../api';
import { VueSpinnerBars } from 'vue3-spinners';

const videos = ref([]);
const loading = ref(true);

const fetchGamingVideos = async () => {
  loading.value = true;

  const storedVideos = localStorage.getItem('youtubeGamingVideos');
  const storedTimestamp = localStorage.getItem('youtubeGamingVideosTimestamp');
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  if (storedVideos && storedTimestamp && now - storedTimestamp < oneDay) {
    videos.value = JSON.parse(storedVideos);
    loading.value = false;
    return;
  }

  try {
    const response = await youtube.get('/videos', {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        regionCode: 'PT',
        videoCategoryId: 20,
        maxResults: 24,
      },
    });

    videos.value = response.data.items || [];
    localStorage.setItem('youtubeGamingVideos', JSON.stringify(videos.value));
    localStorage.setItem('youtubeGamingVideosTimestamp', now.toString());
  } catch (error) {
    console.error('Erro ao buscar vídeos de jogos:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchGamingVideos);
</script>
