<template>
  <div
    v-if="channels.length > 0"
    class="channel-images-row"
  >
    <div
      v-for="channel in channels"
      :key="channel.id.channelId"
      class="channel-image-wrapper"
      @click="handleChannelClick(channel)"
    >
      <img
        v-if="channel.snippet.thumbnails?.default?.url"
        :src="channel.snippet.thumbnails.default.url"
        :alt="channel.snippet.title"
        class="channel-image"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  channels: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['channelClick']);

const handleChannelClick = (channel) => {
  emit('channelClick', channel);
};
</script>
