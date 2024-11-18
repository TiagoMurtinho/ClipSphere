<template>
  <div class="video-player">
    <iframe
      :src="videoUrl"
      allowfullscreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
    <div class="video-details">
      <h2>{{ video.snippet.title }}</h2>
      <p>{{ formatCount(video.statistics.viewCount) }} views</p>
      <p>
        <span v-if="isDescriptionShortened">
          {{ shortenedDescription }}...
        </span>
        <span v-else>{{ video.snippet.description }}</span>
      </p>
      <button
        v-if="video.snippet.description.length > maxDescriptionLength"
        @click="toggleDescription"
        class="video-player-button"
      >
        {{ isDescriptionShortened ? 'Carregar mais' : 'Carregar menos' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import './VideoPlayer.css'
import { computed, ref } from 'vue';

const emit = defineEmits(['descriptionToggled']);

const props = defineProps({
  video: Object,
  maxDescriptionLength: Number,
});

const isDescriptionShortened = ref(true);

const shortenedDescription = computed(() => {
  return props.video?.snippet.description.slice(0, props.maxDescriptionLength);
});

const toggleDescription = () => {
  isDescriptionShortened.value = !isDescriptionShortened.value;
  emit('descriptionToggled', isDescriptionShortened.value ? '30%' : '45%');
};

const videoUrl = computed(() =>
  props.video ? `https://www.youtube.com/embed/${props.video.id}` : ''
);

function formatCount(count) {
  if (count >= 1_000_000) {
    return `${(Math.floor(count / 100_000) / 10).toFixed(1)}M`;
  } else if (count >= 1_000) {
    return `${(Math.floor(count / 100) / 10).toFixed(1)}K`;
  }
  return count.toString();
}
</script>
