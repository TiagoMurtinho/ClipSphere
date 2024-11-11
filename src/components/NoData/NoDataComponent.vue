<template>
  <div class="no-videos-message">
    <i class="bi bi-emoji-frown-fill emoji"></i>
    <p class="message-text">{{ message }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    default: 'Nenhum vídeo encontrado!'
  }
});
</script>

<style scoped>
.no-videos-message {
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  text-align: center;
}

.emoji {
  font-size: 50px;
  color: rgba(0, 0, 0, 0.58);
}

.message-text {
  font-size: 18px;
  font-weight: bold;
  color: #777;
  margin-top: 10px;
  padding-top: 10px;
  opacity: 0.8;
}

.no-videos-message::before {
  font-size: 40px;
  margin-bottom: 10px;
  display: block;
}

.no-videos-message {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
