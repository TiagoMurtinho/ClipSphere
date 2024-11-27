<template>
  <div
    v-if="visible"
    class="popover-container"
  >
    <div class="popover-content">
      <h4>Partilhar</h4>
      <div class="popover-social-share-buttons">
        <a
          class="popover-social-btn"
          :href="shareLinks.facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="bi bi-facebook"></i> Facebook
        </a>
        <a
          class="popover-social-btn"
          :href="shareLinks.twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="bi bi-twitter"></i> Twitter-x
        </a>
        <a
          class="popover-social-btn"
          :href="shareLinks.whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="bi bi-whatsapp"></i> WhatsApp
        </a>
        <a
          class="popover-social-btn"
          :href="shareLinks.linkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="bi bi-linkedin"></i> LinkedIn
        </a>
      </div>
    </div>
    <div class="popover-arrow"></div>
  </div>
</template>

<script setup>
import './Popover.css'
import { computed, ref } from 'vue'

const visible = ref(false);

defineExpose({
  togglePopover: () => {
    visible.value = !visible.value;
  },
});

const props = defineProps({
  shortId: {
    type: String,
    required: true,
  },
});

const shareLinks = computed(() => ({
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://www.youtube.com/shorts/' + props.shortId)}`,
  twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent('https://www.youtube.com/shorts/' + props.shortId)}`,
  whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent('https://www.youtube.com/shorts/' + props.shortId)}`,
  linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent('https://www.youtube.com/shorts/' + props.shortId)}`,
}));
</script>
