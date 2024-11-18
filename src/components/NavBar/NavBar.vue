<template>
  <header :class="['navbar', { 'navbar-pushed': isSidebarOpen }]">
    <div :class="[isHomeView ? 'search-bar-container' : 'search-bar-container-alt']">
      <SearchBar @search="handleSearch" />
    </div>
    <UserButtons
      :isAuthenticated="isAuthenticated"
      @openModal="handleOpenModal"
      @logout="logout"
    />
    <CategoryNavigation
      v-if="isHomeView && categories && categories.length > 0"
      :categories="categories"
      :activeCategory="activeCategory"
      @updateCategory="selectCategory"
    />
  </header>
</template>

<script setup>
import './NavBar.css'
import { inject, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import youtube from '../../api'
import { initGoogleClient } from '@/oauth.js'
import SearchBar from './SearchBar.vue'
import UserButtons from '@/components/NavBar/UserButton.vue'
import CategoryNavigation from '@/components/NavBar/CategoryNavigation.vue'
import Swal from 'sweetalert2'

const isSidebarOpen = inject('isSidebarOpen');
const isAuthenticated = inject('isAuthenticated', false);
const categories = ref([]);
const activeCategory = ref('all');
const loading = ref(false);
let isCategoriesFetched = false;
const route = useRoute();
const router = useRouter();
const isHomeView = ref(route.name === 'home');
const emit = defineEmits(['updateCategory']);

function handleOpenModal() {
  emit('openModal');
}

const logout = () => {
  localStorage.removeItem('authTokens');
  localStorage.removeItem('isAuthenticated');
  isAuthenticated.value = false;
};

function blockSpecialChars(input) {
  const regex = /[^a-zA-Z0-9\s]/g;
  return input.replace(regex, '');
}

function handleSearch(query) {
  if (query) {

    const cleanQuery = blockSpecialChars(query);
    if (cleanQuery !== query) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Caracteres especiais não são permitidos!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    router.push({ name: 'results', query: { q: cleanQuery } });
  }
}

async function fetchCategories() {
  if (isCategoriesFetched) return;

  const savedCategories = localStorage.getItem('youtubeCategories');
  const savedTimestamp = localStorage.getItem('youtubeCategoriesTimestamp');

  const now = new Date().getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  if (savedCategories && savedTimestamp && (now - savedTimestamp < oneDay)) {
    categories.value = JSON.parse(savedCategories);
    isCategoriesFetched = true;
    return;
  }

  loading.value = true;
  try {
    const response = await youtube.get('/videoCategories', {
      params: {
        part: 'snippet',
        regionCode: 'PT',
        hl: 'pt',
      },
    });

    categories.value = response.data.items;
    localStorage.setItem('youtubeCategories', JSON.stringify(categories.value));
    localStorage.setItem('youtubeCategoriesTimestamp', now.toString());

    isCategoriesFetched = true;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
  } finally {
    loading.value = false;
  }
}

function selectCategory(categoryId) {
  activeCategory.value = categoryId;
  emit('updateCategory',  categoryId );
}

onMounted(() => {
  initGoogleClient('558212388408-5vh2jjjjs9be3htk4gl4a27u6d2i368c.apps.googleusercontent.com');

  const authStatus = localStorage.getItem('isAuthenticated');
  if (authStatus === 'true') {
    isAuthenticated.value = true;
  }

  fetchCategories();
  emit('updateCategory', 'all' );
});

watch(() => route.name, (newRouteName) => {
  isHomeView.value = newRouteName === 'home';
});
</script>
