<template>
  <div>
    <div
      class="subscription-title"
      :class="{ 'subscription-title-alt': isSidebarOpen }"
    >
      <CIcon
        :icon="cilFeaturedPlaylist"
        size="3xl"
        class="heading-icon">
      </CIcon>
      <h2 class="subscription-title-heading">Subscrições:</h2>
    </div>
    <SubscriptionFetcher
      v-slot:categories="categories"
      @openModal="openModal"
    >
      <div
        v-for="(category, idx) in categories"
        :key="idx"
      >
        <SubscriptionList
          :categoryName="category.name"
          :channels="category.channels"
        />
      </div>
    </SubscriptionFetcher>
  </div>
</template>

<script setup>
import '../assets/CSS/SubscriptionsView.css'
import SubscriptionFetcher from '../components/Subscription/SubscriptionFetcher.vue';
import SubscriptionList from '../components/Subscription/SubscriptionList.vue';
import { CIcon } from '@coreui/icons-vue'
import { cilFeaturedPlaylist } from '@coreui/icons'
import { inject } from 'vue'

const emit = defineEmits(['openModal']);
const isSidebarOpen = inject('isSidebarOpen');

const openModal = () => {
  emit('openModal');
};
</script>
