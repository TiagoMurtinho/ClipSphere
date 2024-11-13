<template>
  <div>
    <div
      class="sport-title"
      :class="{ 'sport-title-alt': isSidebarOpen }"
    >
      <CIcon
        :icon="cilAmericanFootball"
        size="3xl"
        class="heading-icon">
      </CIcon>
      <h2 class="sport-title-heading">Desporto:</h2>
    </div>
    <SportFetch
      v-slot="{ videos }"
    >
      <SportList
        :videos="videos"
      />
    </SportFetch>
  </div>
</template>

<script setup>
import '../assets/CSS/SportsView.css'
import SportFetch from '../components/Sport/SportFetch.vue';
import SportList from '../components/Sport/SportList.vue';
import { cilAmericanFootball } from '@coreui/icons'
import { CIcon } from '@coreui/icons-vue'
import { inject } from 'vue'

const isSidebarOpen = inject('isSidebarOpen');
</script>
