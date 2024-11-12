<template>
  <div>
    <div v-if="loading" class="loading-container">
      <VueSpinnerBars size="50" color="#000" />
    </div>
    <div v-else>
      <MovieList :movieList="movieList" />
      <NoResults v-if="movieList.length === 0" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MovieList from './MovieList.vue';
import NoResults from '@/components/NoData/NoDataComponent.vue';
import youtube from '../../api';
import { VueSpinnerBars } from 'vue3-spinners';

const movieList = ref([]);
const loading = ref(true);

const fetchMovies = async () => {
  loading.value = true;

  const storedMovies = localStorage.getItem('youtubeMovies');
  const storedTimestamp = localStorage.getItem('youtubeMoviesTimestamp');
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  if (storedMovies && storedTimestamp && (now - storedTimestamp < oneDay)) {
    movieList.value = JSON.parse(storedMovies);
    loading.value = false;
    return;
  }

  try {
    const response = await youtube.get('/search', {
      params: {
        part: 'snippet',
        q: 'movies',
        type: 'video',
        maxResults: 36,
      },
    });

    movieList.value = response.data.items || [];
    localStorage.setItem('youtubeMovies', JSON.stringify(movieList.value));
    localStorage.setItem('youtubeMoviesTimestamp', now.toString());
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchMovies);
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
