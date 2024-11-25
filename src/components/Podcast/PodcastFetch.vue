<template>
  <div>
    <PodcastList
      v-if="videos && videos.length > 0"
      :videos="videos"
    />
    <NoResults
      v-else
      message="Nenhum podcast encontrado!"
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
import './Podcast.css'
import { ref, onMounted } from 'vue';
import PodcastList from './PodcastList.vue';
import NoResults from '@/components/NoData/NoDataComponent.vue';
import youtube from '../../api';
import { VueSpinnerBars } from 'vue3-spinners';

const videos = ref([]);
const loading = ref(true);

const fetchPodcastVideos = async () => {
  loading.value = true;

  const storedVideos = localStorage.getItem('youtubePodcastVideos');
  const storedTimestamp = localStorage.getItem('youtubePodcastVideosTimestamp');
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  if (storedVideos && storedTimestamp && now - storedTimestamp < oneDay) {
    videos.value = JSON.parse(storedVideos);
    loading.value = false;
    return;
  }

  try {
    const searchResponse = await youtube.get('/search', {
      params: {
        part: 'snippet',
        q: 'podcast',
        type: 'video',
        maxResults: 24,
      },
    });

    const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');

    const statsResponse = await youtube.get('/videos', {
      params: {
        part: 'snippet,statistics',
        id: videoIds,
      },
    });

    videos.value = statsResponse.data.items || [];
    localStorage.setItem('youtubePodcastVideos', JSON.stringify(videos.value));
    localStorage.setItem('youtubePodcastVideosTimestamp', now.toString());
  } catch (error) {
    console.error('Erro ao buscar vídeos de podcasts:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPodcastVideos);
</script>
