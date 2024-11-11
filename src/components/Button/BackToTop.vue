<template>
  <button v-if="showBackToTop" class="back-to-top" @click="scrollToTop">
    <CIcon :icon="cilArrowTop" size="lg" />
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { cilArrowTop } from '@coreui/icons';

const showBackToTop = ref(false);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScroll() {
  showBackToTop.value = window.scrollY > 300;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 20px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, opacity 0.3s, visibility 0.3s;
}

.back-to-top:hover {
  background-color: #0056b3;
}

.back-to-top:focus {
  outline: none;
}

.back-to-top[style*="visibility: visible"] {
  visibility: visible;
  opacity: 1;
}
</style>
