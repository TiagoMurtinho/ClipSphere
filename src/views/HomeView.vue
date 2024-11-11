<template>
  <div class="home-view">
    <VideoFetcher :categoryId="categoryId" />
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import VideoFetcher from '../components/Video/VideoFetcher.vue';

const categoryId = ref('all');

const props = defineProps({
  categoryId: {
    type: String,
    default: 'all'
  }
});
</script>

<style>
.home-view {
  display: flex;
  margin-top: 80px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: calc(100vh - 80px);
}
</style>
