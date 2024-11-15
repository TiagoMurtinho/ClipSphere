<template>
  <div class="comments-section" :style="{ marginTop: commentsMarginTop }">
    <h3>Comentários</h3>
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <div class="comment-author-avatar">
        <img
          v-if="comment.snippet.topLevelComment.snippet.authorProfileImageUrl"
          :src="comment.snippet.topLevelComment.snippet.authorProfileImageUrl"
          alt="foto"
        />
      </div>
      <div class="comment-content">
        <p><strong>{{ comment.snippet.topLevelComment.snippet.authorDisplayName }}:</strong></p>
        <p>{{ comment.snippet.topLevelComment.snippet.textDisplay }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import './VideoPlayer.css'

const props = defineProps({
  comments: Array,
  commentsMarginTop: String,
});
</script>

<style scoped>

</style>
