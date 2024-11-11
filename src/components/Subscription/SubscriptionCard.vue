<template>
  <div class="subscription-card">
    <img
      v-if="channel.snippet.thumbnails.default"
      :src="channel.snippet.thumbnails.default.url"
      alt="Thumbnail"
      class="channel-thumbnail"
    />
    <div class="channel-info">
      <h4>{{ channel.snippet.title }}</h4>
    </div>
  </div>
</template>

<script setup>
defineProps({
  channel: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.subscription-card {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 50px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.subscription-card:hover {
  background-color: #f0f0f0;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.channel-thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.channel-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.channel-info h4 {
  margin: 0;
  font-size: 1.1rem;
}

.channel-info p {
  margin: 5px 0 0;
  color: #555;
}
</style>
