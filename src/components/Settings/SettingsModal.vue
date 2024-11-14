<template>
  <transition
    name="settings-modal"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
  <div
    v-if="isOpen"
    class="settings-modal-overlay"
    @click="closeModal"
  >
    <div
      :class="['settings-modal', { 'is-open': isOpen }]"
      @click.stop
    >
      <h2>Configurações</h2>
      <p>Configurações do usuário e preferências.</p>
      <div
        v-if="categories.length > 0"
        class="settings-modal-categories"
      >
        <h3>Categorias favoritas:</h3>

        <div class="settings-modal-category-pair">
          <div
            class="settings-modal-category-item"
            v-for="(category) in categories"
            :key="category.id"
          >
            <input
              type="checkbox"
              class="settings-modal-checkbox"
              :id="category.id"
              :value="category.id"
              v-model="selectedCategories"
              @change="handleCategoryChange"
            />
            <label :for="category.id">{{ category.snippet.title }}</label>
          </div>
        </div>
      </div>

      <button
        class="settings-modal-close-btn"
        @click="closeModal"
      >
        Fechar
      </button>
    </div>
  </div>
  </transition>
</template>

<script setup>
import './SettingsModal.css';
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close', 'updateCategories']);

const categories = ref([]);
const selectedCategories = ref([]);

function loadCategories() {
  const savedCategories = localStorage.getItem('youtubeCategories');
  if (savedCategories) {
    categories.value = JSON.parse(savedCategories);
  }

  const savedSelectedCategories = localStorage.getItem('selectedCategories');
  if (savedSelectedCategories) {
    selectedCategories.value = JSON.parse(savedSelectedCategories);
  }
}

function handleCategoryChange() {
  emit('updateCategories', selectedCategories.value);
  localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories.value));
}

function closeModal() {
  emit('close');
}

onMounted(() => {
  loadCategories();
});

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  },
  { immediate: true }
);

function beforeEnter(el) {
  el.style.transform = 'translateX(100%)';
}

function enter(el, done) {
  el.offsetHeight;
  el.style.transition = 'transform 0.5s ease-out';
  el.style.transform = 'translateX(0)';
  done();
}

function leave(el, done) {
  el.style.transition = 'transform 0.5s ease-in';
  el.style.transform = 'translateX(100%)';
  done();
}
</script>
