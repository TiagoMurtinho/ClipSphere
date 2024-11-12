<template>
  <div>
    <VueSpinnerBars v-if="loading" size="40" color="blue" />
    <ShortsList v-if="shorts && shorts.length > 0" :shorts="shorts" />
    <NoResults v-else message="Nenhum short encontrado!"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ShortsList from './ShortList.vue';
import NoResults from '@/components/NoData/NoDataComponent.vue';
import youtube from '../../api';
import { VueSpinnerBars } from 'vue3-spinners'

const shorts = ref([]);
const loading = ref(true);

const fetchShorts = async () => {
  loading.value = true;

  const storedShorts = localStorage.getItem('youtubeShorts');
  const storedTimestamp = localStorage.getItem('youtubeShortsTimestamp');
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000; // 24 horas

  if (storedShorts && storedTimestamp && (now - storedTimestamp < oneDay)) {
    shorts.value = JSON.parse(storedShorts);
    loading.value = false;
    return;
  }

  try {
    const response = await youtube.get('/videos', {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        videoDuration: 'short',
        type: 'video',
        maxResults: 25,
      },
    });

    shorts.value = response.data.items || [];

    localStorage.setItem('youtubeShorts', JSON.stringify(shorts.value));
    localStorage.setItem('youtubeShortsTimestamp', now.toString());
  } catch (error) {
    console.error('Erro ao buscar os shorts:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchShorts);
</script>
