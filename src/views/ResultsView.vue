<template>
  <div>
    <SearchResults
      :searchQuery="searchQuery"
      :videos="videos"
      :loading="loading"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import youtube from '../api'
import SearchResults from '../components/SearchResults/SearchResults.vue'

const route = useRoute();
const searchQuery = ref(route.query.q || '');
const videos = ref([]);
const loading = ref(false);

async function fetchVideoDetails(videoId) {
  try {
    const response = await youtube.get('/videos', {
      params: {
        id: videoId,
        part: 'snippet,statistics',
      },
    });
    return response.data.items[0];
  } catch (error) {
    console.error('Erro ao buscar detalhes do vídeo', error);
    return null;
  }
}

async function fetchResults(query) {
  loading.value = true;
  try {
    const response = await youtube.get('/search', {
      params: {
        q: query,
        part: 'snippet',
        type: 'video',
        order: 'date',
      },
    });

    const videoDetailsPromises = response.data.items.map(async (video) => {
      const details = await fetchVideoDetails(video.id.videoId);
      if (details) {
        video.statistics = details.statistics;
        const channelResponse = await youtube.get('/channels', {
          params: {
            part: 'snippet',
            id: video.snippet.channelId,
          }
        });
        video.snippet.channelThumbnail = channelResponse.data.items[0].snippet.thumbnails.high.url;
      }
      return video;
    });

    videos.value = await Promise.all(videoDetailsPromises);
  } catch (error) {
    console.error('Erro ao buscar vídeos', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (searchQuery.value) {
    fetchResults(searchQuery.value);
  }
});

watch(
  () => route.query.q,
  (newQuery) => {
    if (newQuery !== searchQuery.value) {
      searchQuery.value = newQuery;
      fetchResults(newQuery);
    }
  }
);
</script>
