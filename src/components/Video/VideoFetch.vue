<template>
  <div :class="{ 'shifted': isSidebarOpen }">
    <VideoList v-if="videos && videos.length > 0" :videos="videos" />
    <NoResults v-else />
    <VueSpinnerBars v-if="loading" size="40" color="blue" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, inject, watch } from 'vue';
import VideoList from './VideoList.vue';
import youtube from '../../api';
import NoResults from '@/components/NoData/NoDataComponent.vue'
import { VueSpinnerBars } from 'vue3-spinners'

const props = defineProps({
  categoryId: {
    type: String,
    default: 'all'
  }
});

const isSidebarOpen = inject('isSidebarOpen');

const videos = ref([]);
const pageToken = ref(null);
const loading = ref(false);
const allVideosFetched = ref(false);

async function fetchVideos(categoryId, isNewCategory = false) {
  if (loading.value || allVideosFetched.value) return;

  if (isNewCategory) {
    videos.value = [];
    pageToken.value = null;
    allVideosFetched.value = false;
  }

  loading.value = true;

  const storedVideos = localStorage.getItem(`youtubeVideos_${categoryId}`);
  const storedTimestamp = localStorage.getItem(`youtubeVideosTimestamp_${categoryId}`);
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  if (storedVideos && storedTimestamp && (now - storedTimestamp < oneDay)) {

    videos.value = JSON.parse(storedVideos);
    loading.value = false;
    return;
  }

  const params = {
    regionCode: 'PT',
    maxResults: 21,
    pageToken: pageToken.value || '',
    hl: 'pt',
    _: Date.now(),
  };

  try {
    let response;
    if (categoryId === 'all') {
      params.part = 'snippet,statistics,contentDetails';
      params.chart = 'mostPopular';
      response = await youtube.get('/videos', { params });
      videos.value.push(...response.data.items);
    } else {
      params.part = 'snippet';
      params.videoCategoryId = categoryId;
      params.order = 'date';
      params.type = 'video';
      response = await youtube.get('/search', { params });
      const filteredVideos = filterVideosByLanguage(response.data.items);
      videos.value.push(...filteredVideos);
    }

    pageToken.value = response.data.nextPageToken;
    allVideosFetched.value = !response.data.nextPageToken;

    localStorage.setItem(`youtubeVideos_${categoryId}`, JSON.stringify(videos.value));
    localStorage.setItem(`youtubeVideosTimestamp_${categoryId}`, now.toString());

  } catch (err) {
    console.error("Erro ao buscar vídeos:", err);
  } finally {
    loading.value = false;
  }
}

watch(() => props.categoryId, (newCategoryId) => {
  fetchVideos(newCategoryId, true);
});

function filterVideosByLanguage(videos) {
  return videos.filter(video => {
    const title = video.snippet.title.toLowerCase();
    const description = video.snippet.description.toLowerCase();

    return title.includes('português') || title.includes('english') ||
      title.includes('pt') || title.includes('en') ||
      description.includes('português') || description.includes('english') ||
      description.includes('pt') || description.includes('en');
  });
}

function handleScroll() {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= documentHeight - 50) {
    fetchVideos(props.categoryId);
  }
}

onMounted(() => {
  fetchVideos(props.categoryId, true);
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.shifted {
  transition: margin-left 0.3s ease;
  margin-left: 13%;
}
</style>
