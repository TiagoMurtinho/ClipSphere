<template>
  <div id="app">
    <NavBar
      @updateCategory="updateCategoryHandler"
      @openModal="openLoginModal"
    />
    <Sidebar
      @openModal="openLoginModal"
      @openSettingsModal="openSettingsModal"
      @openChatbotInline="openChatbotInline"
      @openFeedbackModal="openFeedbackModal"
    />
    <router-view
      :categoryId="currentCategoryId"
      :selectedCategories="selectedCategories"
      @openModal="openLoginModal"
    />
    <BackToTop />
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
    <SettingsModal
      :isOpen="isSettingsModalOpen"
      @close="closeSettingsModal"
      @updateCategories="handleUpdateCategories"
    />
    <ChatbotInline ref="chatbotRef" />
    <FeedbackModal
      :isOpen="isFeedbackModalOpen"
      @close="closeFeedbackModal"
      @submitFeedback="handleFeedbackSubmit"
    />
  </div>
</template>

<script setup>
import '@/assets/CSS/App.css';
import { ref, provide } from 'vue'
import Sidebar from './components/SideBar/Sidebar.vue';
import NavBar from '@/components/NavBar/NavBar.vue'
import BackToTop from '@/components/Button/BackToTop.vue'
import LoginModal from '@/components/NavBar/LoginModal.vue'
import RegistrationModal from '@/components/NavBar/RegistrationModal.vue'
import { cilUser, cilLockLocked } from '@coreui/icons';
import { signIn } from '@/oauth.js'
import SettingsModal from '@/components/Settings/SettingsModal.vue'
import ChatbotInline from '@/components/Chatbot/ChatbotInline.vue'
import FeedbackModal from '@/components/Feedback/FeedbackModal.vue'

const isSidebarOpen = ref(false);
const currentCategoryId = ref('all');
const isAuthenticated = ref(false);
const isSettingsModalOpen = ref(false);
const isFeedbackModalOpen = ref(false);

const chatbotRef = ref(null);

const isChatbotVisible = ref(false);

const openChatbotInline = () => {
  isChatbotVisible.value = !isChatbotVisible.value;
  if (chatbotRef.value) {
    if (isChatbotVisible.value) {
      chatbotRef.value.openChatbot();
    } else {
      chatbotRef.value.closeChatbot();
    }
  }
};

const openFeedbackModal = () => {
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
};

function handleFeedbackSubmit(feedback) {
  console.log("Feedback enviado:", feedback);
  closeFeedbackModal();
}


const openSettingsModal = () => {
  isSettingsModalOpen.value = true;
};

const closeSettingsModal = () => {
  isSettingsModalOpen.value = false;
};

function updateCategoryHandler(categoryId) {
  currentCategoryId.value = categoryId;
}

const selectedCategories = ref([]);

function handleUpdateCategories(categories) {
  selectedCategories.value = categories;
}

provide('selectedCategories', selectedCategories);
provide('isSidebarOpen', isSidebarOpen);
provide('isAuthenticated', isAuthenticated);

const visibleLoginModal = ref(false);
const visibleRegistrationModal = ref(false);

const openModal = () => {
  visibleLoginModal.value = true;
};

const openRegistrationModal = () => {
  visibleLoginModal.value = false;
  visibleRegistrationModal.value = true;
};

const openLoginModal = () => {
  visibleRegistrationModal.value = false;
  visibleLoginModal.value = true;
};

const closeLoginModal = () => {
  visibleLoginModal.value = false;
};

const closeRegistrationModal = () => {
  visibleRegistrationModal.value = false;
};

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
    closeLoginModal();
  } catch (error) {
    console.error('Erro ao autenticar', error);
  }
};

provide('visibleLoginModal', visibleLoginModal);
provide('visibleRegistrationModal', visibleRegistrationModal);
provide('closeLoginModal', closeLoginModal);
provide('closeRegistrationModal', closeRegistrationModal);
provide('openLoginModal', openLoginModal);
provide('openRegistrationModal', openRegistrationModal);
</script>
