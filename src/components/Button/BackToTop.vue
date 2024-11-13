<template>
  <button
    v-if="showBackToTop"
    class="back-to-top"
    @click="scrollToTop"
  >
    <CIcon
      :icon="cilArrowTop"
      size="lg"
    />
  </button>
</template>

<script setup>
import './BackToTop.css'
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
