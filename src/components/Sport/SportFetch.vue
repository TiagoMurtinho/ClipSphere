<template>
  <div>
    <SportList
      v-if="videos && videos.length > 0"
      :videos="videos"
    />
    <NoResults
      v-else
      message="Nenhum desporto encontrado!"
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
import SportList from './SportList.vue';
import NoResults from '@/components/NoData/NoDataComponent.vue';
import youtube from '../../api';
import { VueSpinnerBars } from 'vue3-spinners';
import GamingList from '@/components/Gaming/GamingList.vue'

const videos = ref([]);
const loading = ref(true);

const fetchSportVideos = async () => {
  loading.value = true;

  const storedVideos = localStorage.getItem('youtubeSportVideos');
  const storedTimestamp = localStorage.getItem('youtubeSportVideosTimestamp');
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
        videoCategoryId: 17,
        maxResults: 24,
      },
    });

    videos.value = response.data.items || [];
    localStorage.setItem('youtubeSportVideos', JSON.stringify(videos.value));
    localStorage.setItem('youtubeSportVideosTimestamp', now.toString());
  } catch (error) {
    console.error('Erro ao buscar vídeos de esportes:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchSportVideos);
</script>
