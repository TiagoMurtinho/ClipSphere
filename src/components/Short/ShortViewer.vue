<template>
  <div class="shorts-viewer">
    <div class="video-container">
      <transition
        name="slide-fade"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <ShortsCard :video="shorts[currentIndex]" :key="currentIndex" class="video-card" />
      </transition>
    </div>
    <div
      class="interaction-buttons"
      v-if="showButtons"
      :class="{ 'interaction-fade': showButtons }"
    >
      <div>
        <button class="like-btn">
          <i class="bi bi-hand-thumbs-up-fill"></i>
        </button>
        <span class="count">{{ formatCount(shorts[currentIndex]?.statistics?.likeCount || 0) }}</span>
      </div>
      <div>
        <button class="dislike-btn">
          <i class="bi bi-hand-thumbs-down-fill"></i>
        </button>
        <span class="count">Não Gosto</span>
      </div>
      <div>
        <button class="comment-btn">
          <i class="bi bi-chat-dots-fill"></i>
        </button>
        <span class="count">{{ formatCount(shorts[currentIndex]?.statistics?.commentCount || 0) }}</span>
      </div>
      <div>
        <button class="share-btn" @click="togglePopover">
          <i class="bi bi-share-fill"></i>
        </button>
        <span class="count">Partilhar</span>
        <SocialSharePopover ref="sharePopover" />
      </div>

    </div>
    <div class="controls">
      <button v-if="currentIndex > 0" @click="previousVideo">
        <span class="arrow1">&#8678;</span>
        <span class="text1">Anterior</span>
      </button>
      <button v-if="currentIndex < shorts.length - 1" @click="nextVideo">
        <span class="text2">Próximo</span>
        <span class="arrow2">&#8680;</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ShortsCard from './ShortCard.vue';
import SocialSharePopover from '@/components/Popover/SocialSharePopover.vue'

const props = defineProps({
  shorts: {
    type: Array,
    required: true,
  },
});

const showButtons = ref(true);
const currentIndex = ref(0);
let direction = 'right';

const nextVideo = () => {
  if (currentIndex.value < props.shorts.length - 1) {
    direction = 'right';
    currentIndex.value++;
  }
};

const previousVideo = () => {
  if (currentIndex.value > 0) {
    direction = 'left';
    currentIndex.value--;
  }
};

const beforeEnter = (el) => {
  el.style.transform = direction === 'right' ? 'translateX(150%)' : 'translateX(-150%)';
};

const enter = (el, done) => {
  el.offsetHeight;
  el.style.transition = 'transform 0.8s ease-in-out';
  el.style.transform = 'translateX(0)';
  setTimeout(() => {
    showButtons.value = true;
    done();
  }, 800);
};

const leave = (el, done) => {
  showButtons.value = false;
  el.style.transition = 'transform 0.8s ease-in-out';
  el.style.transform = direction === 'right' ? 'translateX(-150%)' : 'translateX(150%)';
  done();
};

function formatCount(count) {
  if (count >= 1_000_000) {
    return `${(Math.floor(count / 100_000) / 10).toFixed(1)}M`;
  } else if (count >= 1_000) {
    return `${(Math.floor(count / 100) / 10).toFixed(1)}K`;
  }
  return count.toString();
}

const sharePopover = ref(null);
const isPopoverOpen = ref(false);

const togglePopover = () => {
  if (sharePopover.value) {
    isPopoverOpen.value = !isPopoverOpen.value;
    sharePopover.value.togglePopover();
  }
};

const handleClickOutside = (event) => {
  if (
    isPopoverOpen.value &&
    sharePopover.value &&
    !sharePopover.value.$el.contains(event.target) &&
    !event.target.closest('.share-btn')
  ) {
    togglePopover();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.shorts-viewer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-container {
  position: relative;
}

.controls {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.interaction-buttons {
  position: absolute;
  right: 34%;
  bottom: 5.5%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.interaction-fade {
  opacity: 1;
}

.interaction-buttons button {
  background-color: #b6b6b6;
  width: 50px;
  height: 50px;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -6px;
}

.interaction-buttons button:hover {
  background-color: #005bb5;
}

button {
  width: 65px;
  height: 65px;
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #005bb5;
}

.arrow1 {
  font-size: 1.5rem;
  margin-bottom: -7px;
}

.text1 {
  font-size: 1rem;
  margin-top: -7px;
}

.arrow2 {
  font-size: 1.5rem;
  margin-top: -7px;
}

.text2 {
  font-size: 1rem;
  margin-bottom: -7px;
  margin-top: 15px;
}

.interaction-buttons > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
}

.interaction-buttons .count {
  font-size: 0.9rem;
  color: #333;
  text-align: center;
}
</style>
