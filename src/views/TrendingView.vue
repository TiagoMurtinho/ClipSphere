<template>
  <div>
    <div
      class="trending-title"
      :class="{ 'trending-title-alt': isSidebarOpen }">
      <CIcon
        :icon="cilFire"
        size="3xl"
        class="heading-icon">
      </CIcon>
      <h2 class="trending-title-heading">Tendências:</h2>
    </div>
    <TrendingFetch />
  </div>
</template>

<script setup>
import '../assets/CSS/TrendingView.css'
import TrendingFetch from '../components/Trending/TrendingFetch.vue';
import { cilFire } from '@coreui/icons'
import { CIcon } from '@coreui/icons-vue'
import { inject } from 'vue'

const isSidebarOpen = inject('isSidebarOpen');
</script>
