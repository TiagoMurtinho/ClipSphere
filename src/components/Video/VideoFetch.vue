<template>
  <div>
    <VideoList
      v-if="videos.length > 0"
      :videos="videos"
    />
    <NoResults
      v-else
      message="Nenhum vídeo encontrado"
    />
    <VueSpinnerBars
      v-if="loading"
      size="40"
      color="blue"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import VideoList from './VideoList.vue';
import NoResults from '@/components/NoData/NoDataComponent.vue';
import { VueSpinnerBars } from 'vue3-spinners';
import youtube from '../../api';

const props = defineProps({
  categoryId: String
});

const videos = ref([]);
const loading = ref(false);

const fetchVideos = async () => {
  if (loading.value) return;

  loading.value = true;

  const params = {
    regionCode: 'PT',
    maxResults: 24,
    hl: 'pt',
    part: 'snippet,statistics,contentDetails',
  };

  if (props.categoryId === 'all') {
    params.chart = 'mostPopular';
    try {
      const response = await youtube.get('/videos', { params });
      videos.value = response.data.items;

      localStorage.setItem(`youtubeVideos_${props.categoryId}`, JSON.stringify(videos.value));
    } catch (error) {
      console.error('Erro ao buscar vídeos populares:', error.response?.data || error);
    }
  } else {
    const categoryId = Number(props.categoryId);

    if (isNaN(categoryId)) {
      console.error(`Categoria inválida: ${props.categoryId}`);
      loading.value = false;
      return;
    }

    params.videoCategoryId = categoryId;
    params.chart = 'mostPopular';

    try {
      const response = await youtube.get('/videos', { params });
      console.log('Resposta da API para categoria específica:', response.data);
      videos.value = response.data.items;
      localStorage.setItem(`youtubeVideos_${categoryId}`, JSON.stringify(videos.value));
    } catch (error) {
      console.error(`Erro ao buscar vídeos para a categoria ${categoryId}:`, error.response?.data || error);
    }
  }

  loading.value = false;
};

watch(() => props.categoryId, () => {
  videos.value = [];
  fetchVideos();
});

onMounted(fetchVideos);
</script>
