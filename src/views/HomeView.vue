<template>
  <div class="home-view">
    <VideoFetcher
      :categoryId="categoryId"
      :selectedCategories="selectedCategories"
    />
  </div>
</template>

<script setup>
import '@/assets/CSS/HomeView.css'
import VideoFetcher from '../components/Video/VideoFetch.vue';

const props = defineProps({
  categoryId: {
    type: String,
    default: 'all'
  },
  selectedCategories: {
    type: Array,
    default: () => []
  }
});
</script>
