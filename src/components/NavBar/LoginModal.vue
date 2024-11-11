<template>
  <ModalComponent
    :visible="visible"
    @close="closeModal"
    title="Iniciar Sessão"
  >
    <LoginForm
      :cilUser="cilUser"
      :cilLockLocked="cilLockLocked"
      @googleLogin="OAuth"
    />
    <template #footer>
      <CButton color="secondary" @click="openRegistrationModal">Novo Utilizador</CButton>
      <CButton color="primary">Entrar</CButton>
    </template>
  </ModalComponent>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import ModalComponent from '@/components/Modal/StaticBackdropCenteredModal.vue'
import LoginForm from '@/components/Form/LoginForm.vue'
import { CButton } from '@coreui/vue/dist/esm/components/button/index.js'

const props = defineProps({
  visible: Boolean,
  cilUser: Object,
  cilLockLocked: Object,
})

const emit = defineEmits(['close', 'openRegistrationModal', 'googleLogin']);

const closeModal = () => {
  emit('close')
}

const openRegistrationModal = () => {
  emit('openRegistrationModal')
}

const OAuth = () => {
  emit('googleLogin')
}
</script>
