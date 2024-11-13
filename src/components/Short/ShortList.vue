<template>
  <div class="shorts-list">
    <ShortsViewer
      :shorts="shorts"
    />
  </div>
</template>

<script setup>
import './Short.css'
import ShortsViewer from './ShortViewer.vue';

const props = defineProps({
  shorts: {
    type: Array,
    required: true,
  },
});
</script>
