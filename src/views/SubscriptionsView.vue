<template>
  <div>
    <h2>Canais por Categoria</h2>
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
</script>

<style scoped>
h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}
</style>
