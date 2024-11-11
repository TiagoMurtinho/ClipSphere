<template>
  <div  v-if="video && video.snippet"  class="shorts-card">

    <div class="thumbnail">
      <img :src="video.snippet.thumbnails.high.url" alt="Short thumbnail" />
    </div>

    <div class="info">
      <h3 class="title">{{ truncatedTitle }}</h3>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  video: {
    type: Object,
    required: true,
    default: () => ({})
  },
});

const truncatedTitle = computed(() => {
  return props.video.snippet.title.length > 40
    ? props.video.snippet.title.slice(0, 40) + '...'
    : props.video.snippet.title;
});

</script>

<style scoped>
.shorts-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
}

.thumbnail {
  width: 350px;
  height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ddd;
  margin-top: 7%;
  border-radius: 15px;
}
.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.info {
  padding: 8px;
  text-align: center;
}
.title {
  font-size: 0.9rem;
  font-weight: bold;
  margin: 5px 0;
  color: #333;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
