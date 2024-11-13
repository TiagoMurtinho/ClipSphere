<template>
  <div
    v-if="visible"
    class="popover-container"
  >
    <div class="popover-content">
      <h4>Partilhar</h4>
      <div class="popover-social-share-buttons">
        <button class="popover-social-btn">
          <i class="bi bi-facebook"></i> Facebook
        </button>
        <button class="popover-social-btn">
          <i class="bi bi-twitter-x"></i> Twitter-x
        </button>
        <button class="popover-social-btn">
          <i class="bi bi-whatsapp"></i> WhatsApp
        </button>
        <button class="popover-social-btn">
          <i class="bi bi-linkedin"></i> LinkedIn
        </button>
        <button class="popover-social-btn">
          <i class="bi bi-instagram"></i> Instagram
        </button>
      </div>
    </div>
    <div class="popover-arrow"></div>
  </div>
</template>

<script setup>
import './Popover.css'
import { ref } from 'vue';

const visible = ref(false);

defineExpose({
  togglePopover: () => {
    visible.value = !visible.value;
  },
});
</script>
