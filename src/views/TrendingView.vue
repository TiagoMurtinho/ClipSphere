<template>
  <div>
    <div class="title" :class="{ 'title-alt': isSidebarOpen }">
      <CIcon :icon="cilFire" size="3xl" class="icon"></CIcon>
      <h2>Tendências:</h2>
    </div>
    <TrendingFetch>
      <template #default="{ trendingVideos }">
        <TrendingList :trendingVideos="trendingVideos" />
      </template>
    </TrendingFetch>
  </div>
</template>

<script setup>
import TrendingFetch from '../components/Trending/TrendingFetch.vue';
import TrendingList from '../components/Trending/TrendingList.vue';
import { cilFire } from '@coreui/icons'
import { CIcon } from '@coreui/icons-vue'
import { inject } from 'vue'

const isSidebarOpen = inject('isSidebarOpen');
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  margin: 8% 8% -15px 8%;
  transition: margin-left 0.3s ease;
}

.title h2 {
  margin: 4px 8px 0 10px;
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.icon {
  color: #737373;
}

.title-alt {
  margin-left: 26%;
  transition: margin-left 0.3s ease;
}
</style>
