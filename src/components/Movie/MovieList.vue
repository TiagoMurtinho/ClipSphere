<template>
  <div
    class="movie-list-container"
    :class="{ shifted: isSidebarOpen }"
  >
    <div class="movie-list">
      <div
        v-for="(row, rowIndex) in paginatedMovies"
        :key="rowIndex"
        class="movie-row"
      >
        <h2 class="movie-row-title">{{ rowTitles[rowIndex] }}</h2>
        <button
          @click="previousRow(rowIndex)"
          v-if="currentRowPage[rowIndex] > 0"
          class="movie-pagination-button movie-left"
        >
          <CIcon
            :icon="cilArrowLeft"
            size="lg"
          />
        </button>
        <transition
          :name="transitionDirection === 'right' ? 'movie-transition-right' : 'movie-transition-left'"
          mode="out-in"
        >
          <div
            class="movies"
            :key="currentRowPage[rowIndex] + '-' + rowIndex"
          >
            <MovieCard
              v-for="(movie) in row"
              :key="movie.id.videoId"
              :movie="movie"
              @click="handleVideoClick(movie)"
            />
          </div>
        </transition>
        <button
          @click="nextRow(rowIndex)"
          v-if="currentRowPage[rowIndex] < Math.floor(moviesPerLine / moviesPerPage) - 1"
          class="movie-pagination-button movie-right"
        >
          <CIcon
            :icon="cilArrowRight"
            size="lg"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import './Movie.css'
import { ref, computed, inject } from 'vue'
import MovieCard from './MovieCard.vue';
import { CIcon } from '@coreui/icons-vue'
import { cilArrowLeft, cilArrowRight } from '@coreui/icons'
import router from '@/router/index.js'

const props = defineProps({
  movieList: {
    type: Array,
    required: true,
  },
});

const moviesPerLine = 12;
const moviesPerPage = 4;
const rowsPerPage = 3;
const currentPage = ref(0);
const currentRowPage = ref(Array(rowsPerPage).fill(0));
const transitionDirection = ref('right');
const rowTitles = [
  'Mais vendidos:',
  'Promoções da semana:',
  'Aminação:',
];

const paginatedMovies = computed(() => {
  const rows = [];
  let movies = props.movieList;

  for (let i = 0; i < rowsPerPage; i++) {
    rows.push(movies.slice(i * moviesPerLine, (i + 1) * moviesPerLine));
  }

  return rows.map((row, index) => {
    return row.slice(
      currentRowPage.value[index] * moviesPerPage,
      (currentRowPage.value[index] + 1) * moviesPerPage
    );
  });
});

function nextRow(rowIndex) {
  if (currentRowPage.value[rowIndex] < Math.floor(moviesPerLine / moviesPerPage) - 1) {
    transitionDirection.value = 'right';
    currentRowPage.value[rowIndex]++;
  }
}

function previousRow(rowIndex) {
  if (currentRowPage.value[rowIndex] > 0) {
    transitionDirection.value = 'left';
    currentRowPage.value[rowIndex]--;
  }
}

const isSidebarOpen = inject('isSidebarOpen');

const handleVideoClick = (movie) => {
  const videoId = movie.id.videoId;
  if (videoId) {
    router.push(`/player/${videoId}`);
  } else {
    console.error("ID do vídeo não encontrado!");
  }
};
</script>
