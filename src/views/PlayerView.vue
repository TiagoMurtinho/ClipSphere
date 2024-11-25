<template>
  <div
    class="player-view"
    v-if="video"
  >
    <div class="player-content">
      <div
        class="player-main-column"
        :class="{ 'player-main-column-alt': isSidebarOpen }"
      >
        <VideoPlayer
          :video="video"
          :maxDescriptionLength="200"
          @descriptionToggled="handleDescriptionToggle"
        />

        <CommentsSection
          :comments="comments"
          :commentsMarginTop="commentsMarginTop"
        />
      </div>

      <RelatedVideos
        :videos="relatedVideos"
      />
    </div>
  </div>
</template>

<script setup>
import '../assets/CSS/PlayerView.css'
import { inject, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import youtube from '../api';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer.vue';
import CommentsSection from '../components/VideoPlayer/CommentsSection.vue';
import RelatedVideos from '../components/VideoPlayer/RelatedVideo.vue';

const isSidebarOpen = inject('isSidebarOpen');
const video = ref(null);
const relatedVideos = ref([]);
const comments = ref([]);
const route = useRoute();

const fetchVideoDetails = async (videoId) => {
  try {
    const response = await youtube.get('/videos', {
      params: {
        id: videoId,
        part: 'snippet,statistics,contentDetails',
      },
    });

    video.value = response.data.items[0] || null;
    if (video.value) {
      await fetchVideosByCategory(video.value.snippet.categoryId);
      await fetchComments(video.value.id);
    }
  } catch (error) {
    console.error('Erro ao buscar detalhes do vídeo:', error.response?.data || error);
    video.value = null;
  }
};

const fetchVideosByCategory = async (categoryId) => {
  try {
    const response = await youtube.get('/videos', {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        videoCategoryId: categoryId,
        regionCode: 'PT',
        maxResults: 10,
      },
    });

    relatedVideos.value = response.data.items || [];
  } catch (error) {
    console.error('Erro ao buscar vídeos da mesma categoria:', error.response?.data || error);
    relatedVideos.value = [];
  }
};

const fetchComments = async (videoId) => {
  try {
    const response = await youtube.get('/commentThreads', {
      params: {
        part: 'snippet',
        videoId: videoId,
        textFormat: 'plainText',
        maxResults: 5,
      },
    });

    comments.value = response.data.items || [];
  } catch (error) {
    console.error('Erro ao buscar comentários:', error.response?.data || error);
    comments.value = [];
  }
};

const commentsMarginTop = ref('30%');

watch(
  () => isSidebarOpen?.value,
  (newVal) => {
    if (newVal) {
      if (window.matchMedia("(max-width: 400px)").matches) {
        commentsMarginTop.value = '85%';
      } else {
        commentsMarginTop.value = '40%';
      }
    } else {
      if (window.matchMedia("(max-width: 400px)").matches) {
        commentsMarginTop.value = '85%';
      } else {
        commentsMarginTop.value = '30%';
      }
    }
  },
  { immediate: true }
);

const handleDescriptionToggle = (newMarginTop) => {
  commentsMarginTop.value = newMarginTop;
};

watch(
  () => route.params.videoId,
  async (newVideoId) => {
    if (newVideoId) {
      await fetchVideoDetails(newVideoId);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  { immediate: true }
);
</script>
