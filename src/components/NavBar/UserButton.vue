<template>
  <button
    v-if="!isAuthenticated"
    class="user-icon-container"
    @click="$emit('openModal')"
  >
    <CIcon
      class="user-icon"
      :icon="cilUser"
      size="xl"
    />
    Iniciar sessão
  </button>
  <button
    v-if="isAuthenticated"
    class="user-icon-container"
    @click="$emit('logout')"
  >
    <CIcon
      class="user-icon"
      :icon="cilLockLocked"
      size="xl"
    />
    Terminar sessão
  </button>
</template>

<script setup>
import { cilUser, cilLockLocked } from '@coreui/icons'

defineProps({
  isAuthenticated: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['openModal', 'logout'])
</script>
