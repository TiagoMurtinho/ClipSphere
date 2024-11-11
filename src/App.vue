<template>
  <div id="app">
    <NavBar @search="handleSearch" @updateCategory="updateCategoryHandler" />
      <Sidebar />
      <router-view :categoryId="currentCategoryId" />
      <BackToTop />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import Sidebar from './components/SideBar/Sidebar.vue';
import NavBar from '@/components/NavBar/NavBar.vue'
import BackToTop from '@/components/Button/BackToTop.vue'

const isSidebarOpen = ref(false);
const currentCategoryId = ref('all');

provide('isSidebarOpen', isSidebarOpen);

function updateCategoryHandler(categoryId) {
  currentCategoryId.value = categoryId;
}

function handleSearch(query) {
  console.log("Buscando por:", query);
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
