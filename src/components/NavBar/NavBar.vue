<template>
  <header :class="['navbar', { 'navbar-pushed': isSidebarOpen }]">
    <div :class="[isHomeView ? 'search-bar-container' : 'search-bar-container-alt']">
      <SearchBar @search="handleSearch" />
    </div>
    <UserButtons
      :isAuthenticated="isAuthenticated"
      @openModal="openModal"
      @logout="logout"
    />
    <LoginModal
      :visible="visibleLoginModal"
      @close="closeLoginModal"
      @openRegistrationModal="openRegistrationModal"
      @googleLogin="OAuth"
      :cilUser="cilUser"
      :cilLockLocked="cilLockLocked"
    />
    <RegistrationModal
      :visible="visibleRegistrationModal"
      @close="closeRegistrationModal"
      @openLoginModal="openLoginModal"
      :cilUser="cilUser"
      :cilLockLocked="cilLockLocked"
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
import { defineEmits, inject, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { cilLockLocked, cilUser } from '@coreui/icons'
import youtube from '../../api'
import { initGoogleClient, signIn } from '@/oauth.js'
import SearchBar from './SearchBar.vue'
import UserButtons from '@/components/NavBar/UserButton.vue'
import LoginModal from '@/components/NavBar/LoginModal.vue'
import RegistrationModal from '@/components/NavBar/RegistrationModal.vue'
import CategoryNavigation from '@/components/NavBar/CategoryNavigation.vue'

const isSidebarOpen = inject('isSidebarOpen');
const categories = ref([]);
const activeCategory = ref('all');
const emit = defineEmits(['updateCategory']);
const route = useRoute();
const isHomeView = ref(route.name === 'home');
const isAuthenticated = ref(false);

watch(() => route.name, (newRouteName) => {
  isHomeView.value = newRouteName === 'home';
});

const visibleLoginModal = ref(false)
const visibleRegistrationModal = ref(false)

const openModal = () => {
  visibleLoginModal.value = true;
};

const openRegistrationModal = () => {
  visibleLoginModal.value = false;
  visibleRegistrationModal.value = true;
}

const openLoginModal = () => {
  visibleRegistrationModal.value = false;
  visibleLoginModal.value = true;
}

const closeLoginModal = () => {
  visibleLoginModal.value = false;
};

const closeRegistrationModal = () => {
  visibleRegistrationModal.value = false;
};

onMounted(() => {
  initGoogleClient('558212388408-5vh2jjjjs9be3htk4gl4a27u6d2i368c.apps.googleusercontent.com');

  const authStatus = localStorage.getItem('isAuthenticated');
  if (authStatus === 'true') {
    isAuthenticated.value = true;
  }
});

const OAuth = async () => {
  try {
    const tokens = await signIn();

    const tokenData = {
      accessToken: tokens.access_token,
      expiresIn: tokens.expires_in,
    };

    localStorage.setItem('authTokens', JSON.stringify(tokenData));
    localStorage.setItem('isAuthenticated', 'true');

    isAuthenticated.value = true;

    window.location.href = '/';
  } catch (error) {
    console.error('Erro ao autenticar', error);
  }
};

const logout = () => {

  localStorage.removeItem('authTokens');
  localStorage.removeItem('isAuthenticated');
  isAuthenticated.value = false;
  window.location.href = '/';
};

const loading = ref(false);
let isCategoriesFetched = false;

async function handleSearch(query) {
  const response = await youtube.get('/search', {
    params: {
      q: query,
      part: 'snippet',
      type: 'video',
      order: 'date',
    },
  });
  emit('updateCategory', { videos: response.data.items, category: 'search' });
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
  fetchCategories();
  emit('updateCategory', 'all' );
});
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: transform 0.2s ease;
}

.navbar-pushed {
  transform: translateX(200px);
  width: 87%;
  padding: 0.8%;
}

.search-bar-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 1.1%;
  transition: all 0.3s ease;
}

.search-bar-container-alt {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  transition: all 0.3s ease;
}
</style>
