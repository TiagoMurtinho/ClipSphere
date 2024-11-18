<template>
  <div class="github-style-search">
    <SearchInput
      v-model="searchText"
      placeholder="Search or jump to..."
      :search-icon="false"
      :clear-icon="false"
      :clear-on-esc="false"
      :select-on-focus="false"
      @search="onSearch"
    />
  </div>
</template>

<script setup>
import SearchInput from 'vue-search-input';
import 'vue-search-input/dist/styles.css'
import { ref } from 'vue'

const searchText = ref('');

const emit = defineEmits(['search']);

const onSearch = () => {
  emit('search', searchText.value);

  searchText.value = '';
}
</script>
