<template>
  <div class="home-view">
    <VideoFetcher
      :categoryId="categoryId"
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
  }
});
</script>
