<template>
  <div
    v-if="isVisible"
    id="chatling-inline-bot"
    class="chatbot-container"
    :class="{ active: isVisible }"
  >
  </div>
</template>

<script setup>
import './ChatbotInline.css';
import { ref, onMounted } from 'vue';

const isVisible = ref(false);

function loadChatbotScript() {
  if (!document.getElementById('chatling-embed-script')) {
    const script = document.createElement('script');
    script.src = 'https://chatling.ai/js/embed.js';
    script.async = true;
    script.id = 'chatling-embed-script';
    script.setAttribute('data-id', '3994393143');
    script.setAttribute('data-display', 'page_inline');
    document.body.appendChild(script);

    const configScript = document.createElement('script');
    configScript.innerHTML = `window.chtlConfig = { chatbotId: "3994393143", display: "page_inline" };`;
    document.body.appendChild(configScript);
  }
}

function openChatbot() {
  isVisible.value = true;
  loadChatbotScript();
}

const closeChatbot = () => {
  isVisible.value = false;
};

onMounted(() => {
  isVisible.value = false;
});

defineExpose({
  openChatbot,
  closeChatbot
});
</script>
