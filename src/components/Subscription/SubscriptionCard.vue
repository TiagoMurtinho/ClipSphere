<template>
  <div class="subscription-card">
    <img
      v-if="channel.snippet.thumbnails.default"
      :src="channel.snippet.thumbnails.default.url"
      alt="Thumbnail"
      class="subscription-card-channel-thumbnail"
    />
    <div class="subscription-card-channel-info">
      <h4>{{ channel.snippet.title }}</h4>
    </div>
  </div>
</template>

<script setup>
import './Subscription.css'

defineProps({
  channel: {
    type: Object,
    required: true,
  },
});
</script>
