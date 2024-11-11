<template>
  <div class="github-style-search">
    <SearchInput
      v-model="searchText"
      placeholder="Search or jump to..."
      :search-icon="false"
      :clear-icon="false"
      :clear-on-esc="false"
      :select-on-focus="false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchInput from 'vue-search-input';
import 'vue-search-input/dist/styles.css'

const searchText = ref('');
</script>

<style scoped>
.github-style-search .search-input-wrapper {
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 4px 8px;
  width: 270px;
  font-size: 14px;
  color: #57606a;
  transition: width 0.3s ease;
}

.github-style-search .search-input-wrapper:focus-within {
  width: 350px;
}

.search-input {
  border: none;
  outline: none;
  width: 100%;
}
</style>
