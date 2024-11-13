<template>
  <form @submit.prevent="handleRegistration">
    <div class="mb-3">
      <CFormLabel for="username">Nome de Utilizador</CFormLabel>
      <div class="register-input-group">
        <div class="register-icon-container">
          <CIcon
            :icon="cilUser"
            class="register-input-icon"
          />
        </div>
        <CFormInput
          id="username"
          v-model="username"
          placeholder="Digite seu nome de utilizador"
          required
        />
      </div>
    </div>
    <div class="mb-3">
      <CFormLabel for="password">Senha</CFormLabel>
      <div class="register-input-group">
        <div class="register-icon-container">
          <CIcon
            :icon="cilLockLocked"
            class="register-input-icon"
          />
        </div>
        <CFormInput
          type="password"
          id="password"
          v-model="password"
          placeholder="Digite sua senha"
          required
        />
      </div>
    </div>
  </form>
</template>

<script setup>
import './LoginRegisterForm.css'
import { ref } from 'vue';
import { CFormInput, CFormLabel } from '@coreui/vue/dist/esm/components/form/index.js'

const props = defineProps({
  cilUser: {
    type: Array,
    required: true,
  },
  cilLockLocked: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits();

const username = ref('');
const password = ref('');

const handleRegistration = () => {
  emit('registration', {
    username: username.value,
    password: password.value,
  });
};
</script>
