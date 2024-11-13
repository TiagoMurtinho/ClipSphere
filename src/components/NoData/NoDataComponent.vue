<template>
  <div class="no-videos-message">
    <i class="bi bi-emoji-frown-fill no-videos-emoji"></i>
    <p class="no-videos-message-text">{{ message }}</p>
  </div>
</template>

<script setup>
import './NoData.css'
const props = defineProps({
  message: {
    type: String,
    default: 'Nenhum vídeo encontrado!'
  }
});
</script>
