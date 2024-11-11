<template>
  <button
    v-if="!isAuthenticated"
    class="user-icon-container"
    @click="$emit('openModal')"
  >
    <CIcon class="user-icon" :icon="cilUser" size="xl" />
    Iniciar sessão
  </button>
  <button
    v-if="isAuthenticated"
    class="user-icon-container"
    @click="$emit('logout')"
  >
    <CIcon class="user-icon" :icon="cilLockLocked" size="xl" />
    Terminar sessão
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { cilUser, cilLockLocked } from '@coreui/icons'

defineProps({
  isAuthenticated: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['openModal', 'logout'])
</script>

<style scoped>
.user-icon-container {
  margin-right: 0.5%;
  border: 2px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 4px;
  background-color: #ffffff;
}

.user-icon-container:hover {
  background-color: #eaeaea;
}

.user-icon {
  cursor: pointer;
  margin-right: 4px;
}
</style>
