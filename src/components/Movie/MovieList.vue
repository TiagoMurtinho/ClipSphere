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
        <h2 class="row-title">{{ rowTitles[rowIndex] }}</h2>
        <button
          @click="previousRow(rowIndex)"
          v-if="currentRowPage[rowIndex] > 0"
          class="pagination-button left"
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
          <div class="movies" :key="currentRowPage[rowIndex] + '-' + rowIndex">
            <MovieCard
              v-for="(movie) in row"
              :key="movie.id"
              :movie="movie"
            />
          </div>
        </transition>
        <button
          @click="nextRow(rowIndex)"
          v-if="currentRowPage[rowIndex] < Math.floor(moviesPerLine / moviesPerPage) - 1"
          class="pagination-button right"
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
import { ref, computed, inject } from 'vue'
import MovieCard from './MovieCard.vue';
import { CIcon } from '@coreui/icons-vue'
import { cilArrowLeft, cilArrowRight } from '@coreui/icons'

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
</script>

<style scoped>
.movie-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: margin-left 0.3s ease-in-out;
}

.movie-list-container.shifted {
  margin-left: 10%;
  transition: margin-left 0.3s ease-in-out;
}

.movie-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.movie-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
  width: 100%;
  min-height: 600px;
  margin-top: 5%;
}

.row-title {
  font-size: 1.5em;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
}

.movies {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.movie-list > .movie-row > * {
  flex: 1 1 80%;
  max-width: 80%;
}

.pagination-button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 1.2em;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10;
}

.left {
  left: 8.5%;
  top: 45%;
  transform: translateY(-50%);
}

.right {
  right: 8.5%;
  top: 45%;
  transform: translateY(-50%);
}

.movie-transition-right-enter-active,
.movie-transition-right-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.movie-transition-right-enter {
  opacity: 0;
  transform: translateX(100%);
}

.movie-transition-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.movie-transition-left-enter-active,
.movie-transition-left-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.movie-transition-left-enter {
  opacity: 0;
  transform: translateX(-100%);
}

.movie-transition-left-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
