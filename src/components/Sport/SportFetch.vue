<template>
  <div>
    <VueSpinnerBars size="50" color="#000" />
    <div>
      <SportList :videos="videos" />
      <NoResults v-if="videos.length === 0" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SportList from './SportList.vue';
import NoResults from '@/components/NoData/NoDataComponent.vue';
import youtube from '../../api';
import { VueSpinnerBars } from 'vue3-spinners';

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
