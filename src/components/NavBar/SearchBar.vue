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
