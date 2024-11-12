<template>
  <ModalComponent
    :visible="visible"
    @close="closeModal"
    title="Registrar Novo Utilizador"
  >
    <RegistrationForm
      :cilUser="cilUser"
      :cilLockLocked="cilLockLocked"
      @register="registerUser"
    />
    <template #footer>
      <CButton color="secondary" @click="openLoginModal">Utilizador existente</CButton>
      <CButton color="primary" @click="registerUser">Registrar</CButton>
    </template>
  </ModalComponent>
</template>

<script setup>
import ModalComponent from '@/components/Modal/StaticBackdropCenteredModal.vue'
import RegistrationForm from '@/components/Form/RegistrationForm.vue'
import { CButton } from '@coreui/vue/dist/esm/components/button/index.js'

const props = defineProps({
  visible: Boolean,
  cilUser: Object,
  cilLockLocked: Object,
})

const emit = defineEmits(['close', 'openLoginModal','registerUser']);

const closeModal = () => {
  emit('close')
}

const openLoginModal = () => {
  emit('openLoginModal')
}

const registerUser = () => {
  emit('registerUser')
}
</script>
