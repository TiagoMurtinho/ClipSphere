<template>
  <div
    class="sidebar-wrapper"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <CSidebar
      :class="['sidebar', { 'sidebar-closed': !isSidebarOpen }]"
      :unfoldable="true"
    >
      <CSidebarHeader class="border-bottom" :class="sidebarBrandClass">
        <CSidebarBrand class="sidebar-brand">
          <img
            src="../../assets/ClipSphereIcon.png"
            alt="ClipSphere Logo"
            :class="sidebarLogoClass"
          />
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav class="sidebar-nav" :class="{ 'show-scroll': isSidebarOpen }">
        <CNavItem
          href="#"
          @click="navigateTo('/')"
          :style="navItemStyle('/')"
        >
          <CIcon
            customClassName="nav-icon"
            :icon="cilHome"
            :style="{ color: isActive('/') ? 'black' : 'grey' }"
          />
          Início
        </CNavItem>
        <CNavItem
          href="#"
          @click="navigateTo('/shorts')"
          :style="navItemStyle('/shorts')"
        >
          <CIcon
            customClassName="nav-icon"
            :icon="cilAlbum"
            :style="{ color: isActive('/shorts') ? 'black' : 'grey' }"
          />
          Shorts
        </CNavItem>
        <CNavItem
          href="#"
          @click="navigateTo('/subscriptions')"
          :style="navItemStyle('/subscriptions')"
        >
          <CIcon
            customClassName="nav-icon"
            :icon="cilFeaturedPlaylist"
            :style="{ color: isActive('/subscriptions') ? 'black' : 'grey' }"
          />
          Subscrições
        </CNavItem>
        <div class="border-bottom" />
        <CNavTitle>Explorar</CNavTitle>
        <CNavItem
          href="#"
          @click="navigateTo('/trending')"
          :style="navItemStyle('/trending')"
        >
          <CIcon
            customClassName="nav-icon"
            :icon="cilFire"
            :style="{ color: isActive('/trending') ? 'black' : 'grey' }"
          />
          Tendências
        </CNavItem>
        <CNavItem
          href="#"
          @click="navigateTo('/music')"
          :style="navItemStyle('/music')"
        >
          <CIcon
            customClassName="nav-icon"
            :icon="cilMusicNote"
            :style="{ color: isActive('/music') ? 'black' : 'grey' }"
          />
          Musicas
        </CNavItem>
        <CNavItem
          href="#"
          @click="navigateTo('/movies')"
          :style="navItemStyle('/movies')"
        >
          <CIcon
            customClassName="nav-icon"
            :icon="cilMovie"
            :style="{ color: isActive('/movies') ? 'black' : 'grey' }"
          />
          Filmes
        </CNavItem>
        <CNavItem
          href="#"
          @click="navigateTo('/gaming')"
          :style="navItemStyle('/gaming')"
        >
          <CIcon
            customClassName="nav-icon"
            :icon="cilGamepad"
            :style="{ color: isActive('/gaming') ? 'black' : 'grey' }"
          />
          Vídeo Jogos
        </CNavItem>
        <CNavItem
          href="#"
          @click="navigateTo('/sports')"
          :style="navItemStyle('/sports')"
        >
          <CIcon
            customClassName="nav-icon"
            :icon="cilAmericanFootball"
            :style="{ color: isActive('/sports') ? 'black' : 'grey' }"
          />
          Desportos
        </CNavItem>
        <CNavItem
          href="#"
          @click="navigateTo('/podcasts')"
          :style="navItemStyle('/podcasts')"
        >
          <CIcon
            customClassName="nav-icon"
            :icon="cilMic"
            :style="{ color: isActive('/podcasts') ? 'black' : 'grey' }"
          />
          Podcasts
        </CNavItem>
        <div class="border-bottom" />
        <CNavItem
          href="#"
        >
          <CIcon
            customClassName="nav-icon"
            :icon="cilSettings"
          />
          Configurações
        </CNavItem>
        <CNavItem
          href="#"
        >
          <CIcon
            customClassName="nav-icon"
            :icon="cilInfo"
          />
          Ajuda
        </CNavItem>
        <CNavItem
          href="#"
        >
          <CIcon
            customClassName="nav-icon"
            :icon="cilSpeech"
          />
          Enviar Feedback
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  </div>
</template>

<script setup>
import { CSidebar, CSidebarHeader, CSidebarBrand, CSidebarNav, CNavTitle, CNavItem } from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import {
  cilHome,
  cilAlbum,
  cilFeaturedPlaylist,
  cilFire,
  cilMusicNote,
  cilMovie,
  cilGamepad,
  cilAmericanFootball, cilMic, cilSettings, cilInfo, cilSpeech
} from '@coreui/icons'
import { inject, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const isSidebarOpen = inject('isSidebarOpen');
const route = useRoute();

const router = useRouter();
function navigateTo(path) {
  router.push(path);
}

function handleMouseOver() {
  isSidebarOpen.value = true;
}

function handleMouseLeave() {
  isSidebarOpen.value = false;
}
function isActive(path) {
  return route.path === path;
}

function navItemStyle(path) {
  if (isActive(path) && isSidebarOpen.value) {
    return {
      backgroundColor: '#eaeaea',
      color: 'black',
      borderRadius: '8px',
      margin: '5px 0',
    };
  }
  return { backgroundColor: 'transparent', color: 'inherit' };
}

const isHomeRoute = computed(() => route.path === '/');

const sidebarBrandClass = computed(() => ({
  'sidebar-brand': true,
  'sidebar-brand-alt': !isHomeRoute.value
}));

const sidebarLogoClass = computed(() => ({
  'sidebar-logo': isHomeRoute.value && isSidebarOpen.value,
  'sidebar-logo-closed': !isSidebarOpen.value,
  'sidebar-logo-alt': !isHomeRoute.value
}));
</script>

<style scoped>
.sidebar {
  height: 100vh;
  background-color: rgba(52, 58, 64, 0);
  color: white;
  transition: transform 0.3s ease;
}

.sidebar-brand {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 123px;
  transition: height 0.3s ease;
}

.sidebar-brand-alt {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  transition: height 0.3s ease;
}

.sidebar-logo {
  max-width: 60%;
  height: auto;
  transition: max-width 0.3s ease;
}

.sidebar-logo-alt {
  max-width: 35%;
  height: auto;
  transition: max-width 0.3s ease;
}

.sidebar-logo-closed {
  max-width: 100%;
}

.sidebar-nav {
  overflow-y: hidden;
  padding-top: 5px;
}

.sidebar-nav.show-scroll {
  overflow-y: auto;
}

.sidebar-nav::-webkit-scrollbar {
  display: none;
}

.sidebar-nav.show-scroll::-webkit-scrollbar {
  display: block;
}

.sidebar-nav {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.sidebar-nav.show-scroll {
  scrollbar-width: thin;
}
</style>
