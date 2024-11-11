<template>
  <div v-if="visible" class="popover-container">
    <div class="popover-content">
      <h4>Partilhar</h4>
      <div class="social-share-buttons">
        <button class="social-btn">
          <i class="bi bi-facebook"></i> Facebook
        </button>
        <button class="social-btn">
          <i class="bi bi-twitter-x"></i> Twitter-x
        </button>
        <button class="social-btn">
          <i class="bi bi-whatsapp"></i> WhatsApp
        </button>
        <button class="social-btn">
          <i class="bi bi-linkedin"></i> LinkedIn
        </button>
        <button class="social-btn">
          <i class="bi bi-instagram"></i> Instagram
        </button>
      </div>
    </div>
    <div class="popover-arrow"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);

defineExpose({
  togglePopover: () => {
    visible.value = !visible.value;
  },
});
</script>

<style scoped>
.popover-container {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(35px);
  background-color: #fff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 15px;
  width: 250px;
  z-index: 10;
}

.popover-arrow {
  position: absolute;
  left: 50.5%;
  bottom: 15px;
  transform: translateX(-140px) rotate(90deg);;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid rgba(0, 0, 0, 0.2);
  z-index: 11;
}

.social-share-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.social-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.social-btn:hover {
  background-color: #e0e0e0;
}

.social-btn i {
  font-size: 1.5rem;
}
</style>
