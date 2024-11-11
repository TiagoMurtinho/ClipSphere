<template>
  <div>
    <div class="title" :class="{ 'title-alt': isSidebarOpen }">
      <CIcon :icon="cilFeaturedPlaylist" size="3xl" class="icon"></CIcon>
      <h2>Subscrições:</h2>
    </div>
    <SubscriptionFetcher v-slot:categories="categories">
      <div v-for="(category, idx) in categories" :key="idx">
        <SubscriptionList :categoryName="category.name" :channels="category.channels" />
      </div>
    </SubscriptionFetcher>
  </div>
</template>

<script setup>
import SubscriptionFetcher from '../components/Subscription/SubscriptionFetcher.vue';
import SubscriptionList from '../components/Subscription/SubscriptionList.vue';
import { CIcon } from '@coreui/icons-vue'
import { cilFeaturedPlaylist } from '@coreui/icons'
import { inject } from 'vue'

const isSidebarOpen = inject('isSidebarOpen');
</script>

<style scoped>
.title {
   display: flex;
   align-items: center;
   margin: 8% 6.5% -15px 6.5%;
   transition: margin-left 0.3s ease;
 }

.title h2 {
  margin: 4px 8px 0 10px;
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.icon {
  color: #737373;
}

.title-alt {
  margin-left: 20%;
  transition: margin-left 0.3s ease;
}
</style>
