<template>
  <div class="category-navigation">
    <button
      v-if="showScrollLeft"
      @click="scrollLeft"
      class="nav-button"
    >
      <CIcon
        :icon="cilArrowLeft"
      />
    </button>
    <div
      class="category-buttons"
      ref="categoryButtons"
      @scroll="checkScrollPosition"
    >
      <button
        @click="selectCategory('all')"
        class="category-button"
        :class="{ active: isActive('all') }"
      >
        Todos
      </button>
      <button
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category.id)"
        class="category-button"
        :class="{ active: isActive(category.id) }"
      >
        {{ category.snippet.title }}
      </button>
    </div>
    <button
      v-if="showScrollRight"
      @click="handleScrollRight"
      class="nav-button"
    >
      <CIcon
        :icon="cilArrowRight"
      />
    </button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { cilArrowLeft, cilArrowRight } from '@coreui/icons'
import { CIcon } from '@coreui/icons-vue'

const props = defineProps({
  categories: Array,
  activeCategory: String
});

const emit = defineEmits(['updateCategory']);
const categoryButtons = ref(null);
const showScrollLeft = ref(false);
const showScrollRight = ref(true);

const marginForScrollLeftButton = 250;
const marginForScrollRightButton = 250;

watch(() => props.categories, () => {
  checkScrollPosition();
});

function selectCategory(categoryId) {
  emit('updateCategory', categoryId);
}

function isActive(categoryId) {
  return props.activeCategory === categoryId;
}

function scrollLeft() {
  categoryButtons.value.scrollBy({ left: -1250, behavior: 'smooth' });
  checkScrollPosition();
}

function scrollRight() {
  categoryButtons.value.scrollBy({ left: 1250, behavior: 'smooth' });
  checkScrollPosition();
}

function handleScrollRight() {
  scrollRight();
  showScrollLeft.value = true;
}

function checkScrollPosition() {
  const scrollLeft = categoryButtons.value.scrollLeft;
  const scrollWidth = categoryButtons.value.scrollWidth;
  const clientWidth = categoryButtons.value.clientWidth;

  showScrollLeft.value = scrollLeft > marginForScrollLeftButton;

  const distanceToRight = scrollWidth - scrollLeft - clientWidth;
  showScrollRight.value = distanceToRight > marginForScrollRightButton;
}

onMounted(() => {
  checkScrollPosition();
});
</script>
