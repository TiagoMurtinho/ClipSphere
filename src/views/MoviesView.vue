<template>
  <div>
    <div
      class="movie-title"
      :class="{ 'movie-title-alt': isSidebarOpen }"
    >
      <CIcon
        :icon="cilMovie"
        size="3xl"
        class="heading-icon">
      </CIcon>
      <h2 class="movie-title-heading">Filmes:</h2>
    </div>
    <MovieFetch />
  </div>
</template>

<script setup>
import '../assets/CSS/MoviesView.css'
import MovieFetch from '@/components/Movie/MovieFetch.vue';
import { cilMovie } from '@coreui/icons'
import { CIcon } from '@coreui/icons-vue'
import { inject } from 'vue'

const isSidebarOpen = inject('isSidebarOpen');
</script>
