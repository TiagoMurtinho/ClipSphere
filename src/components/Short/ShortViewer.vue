<template>
  <div class="shorts-viewer">
    <div class="short-container">
      <transition
        name="slide-fade"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <ShortsCard
          :video="shorts[currentIndex]"
          :key="currentIndex"
          class="short-card"
        />
      </transition>
    </div>
    <div
      class="short-interaction-buttons"
      v-if="showButtons"
      :class="{ 'short-interaction-fade': showButtons }"
    >
      <div>
        <button
          class="short-button short-like-btn"
          :class="{ 'short-active-button': activeInteractionButton === 'like' }"
          @click="handleActiveButton('like')"
        >
          <i class="bi bi-hand-thumbs-up-fill"></i>
        </button>
        <span class="short-count">{{ formatCount(shorts[currentIndex]?.statistics?.likeCount || 0) }}</span>
      </div>
      <div>
        <button
          class="short-button short-dislike-btn"
          :class="{ 'short-active-button': activeInteractionButton === 'dislike' }"
          @click="handleActiveButton('dislike')"
        >
          <i class="bi bi-hand-thumbs-down-fill"></i>
        </button>
        <span class="short-count">Não Gosto</span>
      </div>
      <div>
        <button class="short-button short-comment-btn">
          <i class="bi bi-chat-dots-fill"></i>
        </button>
        <span class="short-count">{{ formatCount(shorts[currentIndex]?.statistics?.commentCount || 0) }}</span>
      </div>
      <div>
        <button
          class="short-button short-share-btn"
          @click="togglePopover"
        >
          <i class="bi bi-share-fill"></i>
        </button>
        <span class="short-count">Partilhar</span>
        <SocialSharePopover
          ref="sharePopover"
          :shortId="props.shorts[currentIndex]?.id"
        />
      </div>

    </div>
    <div class="short-controls">
      <button
        class="short-button"
        v-if="currentIndex > 0"
        @click="previousVideo"
      >
        <span class="short-arrow1">&#8678;</span>
        <span class="short-text1">Anterior</span>
      </button>
      <button
        class="short-button"
        v-if="currentIndex < shorts.length - 1"
        @click="nextVideo"
      >
        <span class="short-text2">Próximo</span>
        <span class="short-arrow2">&#8680;</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import './Short.css'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ShortsCard from './ShortCard.vue';
import SocialSharePopover from '@/components/Popover/SocialSharePopover.vue'

const props = defineProps({
  shorts: {
    type: Array,
    required: true,
  },
});

const activeInteractionButton = ref(null);

const handleActiveButton = (buttonType) => {
  if (activeInteractionButton.value === buttonType) {
    activeInteractionButton.value = null;
  } else {
    activeInteractionButton.value = buttonType;
  }
};

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

const togglePopover = (event) => {
  event.stopPropagation();
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
    togglePopover(event);
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
