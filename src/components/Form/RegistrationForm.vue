<template>
  <form @submit.prevent="handleRegistration">
    <div class="mb-3">
      <CFormLabel for="username">Nome de Utilizador</CFormLabel>
      <div class="input-group">
        <div class="icon-container">
          <CIcon :icon="cilUser" class="input-icon" />
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
      <div class="input-group">
        <div class="icon-container">
          <CIcon :icon="cilLockLocked" class="input-icon" />
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

<style scoped>
.input-group {
  display: flex;
  align-items: center;
}

.input-icon {
  color: #000000;
  font-size: 1.2rem;
}

.icon-container {
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 38px;
  border-radius: 6px;
}
</style>
