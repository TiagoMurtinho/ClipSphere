<template>
  <div class="category-navigation">
    <button v-if="showScrollLeft" @click="scrollLeft" class="nav-button">←</button>
    <div class="category-buttons" ref="categoryButtons" @scroll="checkScrollPosition">
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
    <button v-if="showScrollRight" @click="handleScrollRight" class="nav-button">→</button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

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

<style scoped>
.category-navigation {
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-left: 4%;
}

.category-buttons {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
}

.category-buttons::-webkit-scrollbar {
  display: none;
}

.category-button {
  background-color: #e1e4e8;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
}

.category-button:hover {
  background-color: #d1d5da;
}

.nav-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  margin: 0 4px;
}

.nav-button:hover {
  background-color: #0056b3;
}

.active {
  background-color: #007bff;
  color: white;
}
</style>
