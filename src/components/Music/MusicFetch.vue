<template>
  <div>
    <MusicList
      v-if="musicList && musicList.length > 0"
      :musicList="musicList"
    />
    <NoResults
      v-else
      message="Nenhuma música encontrada!"
    />
    <div
      v-if="loading"
      class="spinner-container"
    >
      <VueSpinnerBars
        size="40"
        color="blue"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MusicList from './MusicList.vue';
import NoResults from '@/components/NoData/NoDataComponent.vue';
import youtube from '../../api';
import { VueSpinnerBars } from 'vue3-spinners';

const musicList = ref([]);
const loading = ref(true);

const fetchMusic = async () => {
  loading.value = true;

  const storedMusic = localStorage.getItem('youtubeMusic');
  const storedTimestamp = localStorage.getItem('youtubeMusicTimestamp');
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  if (storedMusic && storedTimestamp && (now - storedTimestamp < oneDay)) {
    musicList.value = JSON.parse(storedMusic);
    loading.value = false;
    return;
  }

  try {
    const response = await youtube.get('/videos', {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        videoCategoryId: '10',
        maxResults: 24,
      },
    });

    musicList.value = response.data.items || [];
    localStorage.setItem('youtubeMusic', JSON.stringify(musicList.value));
    localStorage.setItem('youtubeMusicTimestamp', now.toString());
  } catch (error) {
    console.error('Erro ao buscar músicas:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchMusic);
</script>
