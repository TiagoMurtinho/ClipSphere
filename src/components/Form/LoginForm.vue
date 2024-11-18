<template>
  <form @submit.prevent="handleLogin">
    <div class="mb-3">
      <CFormLabel for="username">Nome de Utilizador</CFormLabel>
      <div class="login-input-group">
        <div class="login-icon-container">
          <CIcon
            :icon="cilUser"
            class="login-input-icon"
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
      <div class="login-input-group">
        <div class="login-icon-container">
          <CIcon
            :icon="cilLockLocked"
            class="login-input-icon"
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
    <div class="login-form-check mb-3">
      <CFormCheck
        id="remember"
        v-model="rememberMe"
      />
      <CFormLabel for="remember">Lembrar-me</CFormLabel>
    </div>
    <div class="google-login">
      <button
        @click.prevent="OAuth"
        type="button"
        class="btn-google"
      >
        <i class="bi bi-google"></i>
        <span>Iniciar Sessão com Google</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import './LoginRegisterForm.css'
import { ref } from 'vue';
import { CFormCheck, CFormInput, CFormLabel } from '@coreui/vue/dist/esm/components/form/index.js'

const props = defineProps({
  cilUser: {
    type: Object,
    required: true,
  },
  cilLockLocked: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['login', 'googleLogin']);

const username = ref('');
const password = ref('');
const rememberMe = ref(false);

const handleLogin = () => {
  emit('login', {
    username: username.value,
    password: password.value,
    rememberMe: rememberMe.value,
  });
};

const OAuth = () => {
  emit('googleLogin');
};
</script>
