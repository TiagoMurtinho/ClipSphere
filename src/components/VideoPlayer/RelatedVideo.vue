<template>
  <div class="related-videos">
    <VideoList
      v-if="videos.length > 0"
      :videos="videos"
      @selectVideo="handleVideoSelect"
    />
    <p v-else>Nenhum vídeo encontrado na mesma categoria.</p>
  </div>
</template>

<script setup>
import './VideoPlayer.css'
import VideoList from '../Video/VideoList.vue';

const props = defineProps({
  videos: Array,
});

const emit = defineEmits(['selectVideo']);

const handleVideoSelect = (videoId) => {
  emit('selectVideo', videoId);
};
</script>
