<template>
  <div class="shorts-list">
    <ShortsViewer :shorts="shorts" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import ShortsViewer from './ShortViewer.vue';

const props = defineProps({
  shorts: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.shorts-list {
  display: flex;
  justify-content: center;
}
</style>
